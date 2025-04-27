package apiWebhooks

import (
	"net/http"
	"runny-code/webhooks"
)

func DeleteForCommand(w http.ResponseWriter, r *http.Request) {
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

	// delete the webhook
	err := webhooks.DeleteEntry(commandName, command)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
