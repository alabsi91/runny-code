package apiWebhooks

import (
	"net/http"
	"runny-code/commands"
	"runny-code/webhooks"
)

func HandleMessages(w http.ResponseWriter, r *http.Request) {
	uuid := r.PathValue("uuid")

	// Find the webhook
	var webhookEntry *webhooks.WebhookEntry
	for _, entry := range webhooks.WebhookEntries {
		if entry.UUID == uuid {
			webhookEntry = &entry
			break
		}
	}
	if webhookEntry == nil {
		http.Error(w, "Webhook not found", http.StatusNotFound)
		return
	}

	// Find the command
	var parsedCommand *commands.ParsedCommand
	for _, cmd := range commands.ParsedCommandsList {
		if cmd.Name == webhookEntry.CommandName && cmd.Command == webhookEntry.Command {
			parsedCommand = &cmd
			break
		}
	}
	if parsedCommand == nil {
		http.Error(w, "Command not found", http.StatusNotFound)
		return
	}

	// get command arguments (input)
	data := make(map[string]string)
	queryParams := r.URL.Query()
	for key, values := range queryParams {
		data[key] = values[0]
	}

	commandToExecute, err := commands.FillCommand(parsedCommand.Command, parsedCommand.Variables, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	output, err := commands.SShExecute(commandToExecute)
	if err != nil {
		http.Error(w, "Failed to execute command", http.StatusInternalServerError)
	}

	w.Write(output)
}
