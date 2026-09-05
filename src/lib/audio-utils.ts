/**
 * Generates a valid PCM WAV audio buffer in Node.js.
 * This ensures that audio playback works reliably even in offline/demo mode.
 */
export function generateSyntheticWavBuffer(
  text: string,
  durationSeconds: number = 3.5,
  sampleRate: number = 24000
): Buffer {
  const numChannels = 1;
  const bitsPerSample = 16;
  const numSamples = Math.floor(sampleRate * durationSeconds);
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const chunkSize = 36 + dataSize;

  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(chunkSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Synthesize modulated audio frequency based on text length to sound like speech tones
  const baseFreq = 180 + (text.length % 100);
  let offset = 44;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freqMod = Math.sin(2 * Math.PI * 3 * t) * 35;
    const sampleVal =
      Math.sin(2 * Math.PI * (baseFreq + freqMod) * t) * 0.4 +
      Math.sin(2 * Math.PI * (baseFreq * 2) * t) * 0.2 +
      Math.sin(2 * Math.PI * (baseFreq * 0.5) * t) * 0.1;

    const envelope = Math.sin((Math.PI * i) / numSamples);
    const int16Val = Math.floor(
      Math.max(-32768, Math.min(32767, sampleVal * envelope * 30000))
    );

    buffer.writeInt16LE(int16Val, offset);
    offset += 2;
  }

  return buffer;
}

interface WavInfo {
  dataOffset: number;
  dataLength: number;
  sampleRate: number;
  numChannels: number;
  bitsPerSample: number;
}

/**
 * Scans a WAV buffer and returns exact subchunk offsets for PCM data and audio parameters.
 */
function parseWavHeader(buf: Buffer): WavInfo {
  let sampleRate = 24000;
  let numChannels = 1;
  let bitsPerSample = 16;
  let dataOffset = 44;
  let dataLength = Math.max(0, buf.length - 44);

  if (buf.length < 12 || buf.toString("ascii", 0, 4) !== "RIFF") {
    return { dataOffset: 0, dataLength: buf.length, sampleRate, numChannels, bitsPerSample };
  }

  let offset = 12;
  while (offset + 8 <= buf.length) {
    const chunkId = buf.toString("ascii", offset, offset + 4);
    const chunkSize = buf.readUInt32LE(offset + 4);

    if (chunkId === "fmt " && chunkSize >= 14) {
      numChannels = buf.readUInt16LE(offset + 8 + 2);
      sampleRate = buf.readUInt32LE(offset + 8 + 4);
      bitsPerSample = buf.readUInt16LE(offset + 8 + 14);
    } else if (chunkId === "data") {
      dataOffset = offset + 8;
      dataLength = Math.min(chunkSize, buf.length - dataOffset);
      break;
    }

    offset += 8 + chunkSize;
    if (chunkSize % 2 !== 0) offset += 1;
  }

  return { dataOffset, dataLength, sampleRate, numChannels, bitsPerSample };
}

/**
 * Concatenates multiple PCM WAV audio buffers into a single master WAV audio buffer
 * with a customizable silent pause between speaker turns.
 */
export function concatenateWavBuffers(
  wavBuffers: Buffer[],
  pauseMs: number = 400
): Buffer {
  const validBuffers = wavBuffers.filter((b) => b && b.length > 44);
  if (validBuffers.length === 0) {
    return generateSyntheticWavBuffer("Empty conversation", 2.0);
  }
  if (validBuffers.length === 1) {
    return validBuffers[0];
  }

  // Parse first valid buffer for WAV audio properties
  const firstInfo = parseWavHeader(validBuffers[0]);
  const sampleRate = firstInfo.sampleRate || 24000;
  const numChannels = firstInfo.numChannels || 1;
  const bitsPerSample = firstInfo.bitsPerSample || 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;

  // Extract clean PCM payloads from each buffer using exact subchunk offsets
  const pcmPayloads: Buffer[] = validBuffers.map((buf) => {
    const info = parseWavHeader(buf);
    return buf.subarray(info.dataOffset, info.dataOffset + info.dataLength);
  });

  // Create silent PCM gap buffer between speaker turns
  const silentSamples = Math.floor(sampleRate * (pauseMs / 1000));
  const silentGap = Buffer.alloc(silentSamples * blockAlign);

  // Combine all PCM payloads with silent gaps
  const combinedPcmParts: Buffer[] = [];
  pcmPayloads.forEach((payload, idx) => {
    combinedPcmParts.push(payload);
    if (idx < pcmPayloads.length - 1) {
      combinedPcmParts.push(silentGap);
    }
  });

  const totalPcmData = Buffer.concat(combinedPcmParts);
  const dataSize = totalPcmData.length;
  const chunkSize = 36 + dataSize;

  // Build clean master WAV header
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(chunkSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, totalPcmData]);
}
