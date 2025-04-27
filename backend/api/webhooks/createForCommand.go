package apiWebhooks

import (
	"fmt"
	"net/http"
	"runny-code/commands"
	"runny-code/webhooks"
)

func CreateForCommand(w http.ResponseWriter, r *http.Request) {
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

	// create the webhook
	webhookEntry := webhooks.WebhookEntry{
		CommandName: commandName,
		Command:     command,
	}

	err := webhooks.AddEntry(&webhookEntry)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	webhookUrl := webhooks.ConstructUrl(webhookEntry.UUID)

	w.Write([]byte(webhookUrl))
}
