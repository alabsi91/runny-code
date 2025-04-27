package apiWebhooks

import (
	"fmt"
	"net/http"
	"runny-code/commands"
	"runny-code/webhooks"
)

func GetForCommand(w http.ResponseWriter, r *http.Request) {
	commandName := r.URL.Query().Get("commandName")
	command := r.URL.Query().Get("command")
	if commandName == "" {
		http.Error(w, "Missing command name parameter", http.StatusBadRequest)
		return
	}
	if command == "" {
		http.Error(w, "Missing command parameter", http.StatusBadRequest)
		return
	}

	// check if the command exists
	foundCommand := commands.FindCommand(commands.ParsedCommandsList, commandName)
	if foundCommand == nil {
		http.Error(w, fmt.Sprintf("Command '%s' does not exists", commandName), http.StatusBadRequest)
		return
	}

	// get the webhook for the command
	var webhookEntry *webhooks.WebhookEntry
	for _, entry := range webhooks.WebhookEntries {
		if entry.CommandName == commandName && entry.Command == command {
			webhookEntry = &entry
			break
		}
	}
	if webhookEntry == nil {
		http.Error(w, "Webhook not found", http.StatusNotFound)
		return
	}

	webhookUrl := webhooks.ConstructUrl(webhookEntry.UUID)
	w.Write([]byte(webhookUrl))
}
