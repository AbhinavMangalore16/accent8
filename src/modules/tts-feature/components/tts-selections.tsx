"use client";
import { useEffect } from "react";
import { useDeferredValue, useState } from "react";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { VOICE_LABELS } from "@/modules/voices-feature/data/categorization";
import {Field, FieldLabel} from "@/components/ui/field";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTypedAppFormContext } from "../../../hooks/use-app-form";
import { useTRPC } from "@/trpc/client";
import { defaultTTSValues } from "../data/form";
import { useAvatar } from "@/modules/voices-feature/avatars/use-avatar";

type VoiceOption = {
	id: string;
	name: string;
	category: keyof typeof VOICE_LABELS;
};

function VoiceOptionLabel({ voice }: { voice: VoiceOption }) {
	const avatar = useAvatar(voice.id);

	return (
		<span className="flex items-center gap-2">
			<img
				src={avatar}
				alt={`${voice.name} avatar`}
				className="size-5 rounded-full border border-border/60"
			/>
			<span>{voice.name} - {VOICE_LABELS[voice.category]}</span>
		</span>
	);
}

export function TTSSelections() {
	const form = useTypedAppFormContext({ defaultValues: defaultTTSValues });
	const trpc = useTRPC();
	const [searchQuery, setSearchQuery] = useState("");
	const deferredSearchQuery = useDeferredValue(searchQuery.trim());

	const { data, isLoading, isError } = useQuery(
		trpc.voices.getAll.queryOptions(
			deferredSearchQuery.length > 0 ? { query: deferredSearchQuery } : undefined
		)
	);
	const selectedVoiceId = useStore(form.store, (s) => s.values.voiceId);
	const selectedVoiceName = useStore(form.store, (s) => s.values.voiceName);

	const customVoices = data?.custom ?? [];
	const presetVoices = data?.preset ?? [];
	const allVoices = [...customVoices, ...presetVoices];

	const selectedVoice = allVoices.find((voice) => voice.id === selectedVoiceId);

	useEffect(() => {
        if (!data) return; 
		if (selectedVoice && selectedVoiceName !== selectedVoice.name) {
			form.setFieldValue("voiceName", selectedVoice.name);
		}
        else if (!selectedVoice && selectedVoiceId) {
			form.setFieldValue("voiceId", "");
			form.setFieldValue("voiceName", "");
 		}
	}, [form, data, selectedVoice, selectedVoiceId, selectedVoiceName]);

	return (
		<form.Field
			name="voiceId"
			children={(field) => (
				<Field className="gap-2">
					<FieldLabel className="text-sm font-semibold">Voice</FieldLabel>

					<Input
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						placeholder="Search voices by name"
						className="h-9"
					/>

					<Select
						value={typeof field.state.value === "string" ? field.state.value : ""}
						onValueChange={(value) => {
							const nextVoiceId = value ?? "";
							const nextVoice = allVoices.find((voice) => voice.id === nextVoiceId);

							field.handleChange(nextVoiceId);
							form.setFieldValue("voiceName", nextVoice?.name ?? "");
						}}
						disabled={isLoading || isError || allVoices.length === 0}
					>
						<SelectTrigger className="w-full rounded-md border border-input bg-background">
							<SelectValue
								placeholder={
									isLoading
										? "Loading voices..."
										: isError
											? "Could not load voices"
											: allVoices.length === 0
												? "No voices available"
												: "Select a voice"
								}
							>
								{selectedVoice ? `${selectedVoice.name} - ${VOICE_LABELS[selectedVoice.category]}` : undefined}
							</SelectValue>
						</SelectTrigger>

						<SelectContent>
							{customVoices.length > 0 && (
								<SelectGroup>
									<SelectLabel>Custom Voices</SelectLabel>
									{customVoices.map((voice) => (
										<SelectItem key={voice.id} value={voice.id}>
											<VoiceOptionLabel voice={voice} />
										</SelectItem>
									))}
								</SelectGroup>
							)}

							{customVoices.length > 0 && presetVoices.length > 0 && <SelectSeparator />}

							{presetVoices.length > 0 && (
								<SelectGroup>
									<SelectLabel>Preset Voices</SelectLabel>
									{presetVoices.map((voice) => (
										<SelectItem key={voice.id} value={voice.id}>
											<VoiceOptionLabel voice={voice} />
										</SelectItem>
									))}
								</SelectGroup>
							)}

							{!isLoading && !isError && allVoices.length === 0 && (
								<div className="px-3 py-2 text-xs text-muted-foreground">
									No voices found{deferredSearchQuery ? ` for \"${deferredSearchQuery}\"` : ""}.
								</div>
							)}
						</SelectContent>
					</Select>

					{selectedVoice && (
						<p className="text-xs text-muted-foreground">
							{VOICE_LABELS[selectedVoice.category]}{selectedVoice.language ? ` • ${selectedVoice.language}` : ""}
						</p>
					)}
				</Field>
			)}
		/>
	);
}