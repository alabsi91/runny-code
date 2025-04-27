package apiWebhooks

import (
	"net/http"
	"runny-code/webhooks"
)

func UpdateForCommand(w http.ResponseWriter, r *http.Request) {
	oldCommandName := r.URL.Query().Get("oldCommandName")
	oldCommand := r.URL.Query().Get("oldCommand")
	newCommandName := r.URL.Query().Get("newCommandName")
	newCommand := r.URL.Query().Get("newCommand")
	if oldCommandName == "" {
		http.Error(w, "Missing old command name parameter", http.StatusBadRequest)
		return
	}
	if oldCommand == "" {
		http.Error(w, "Missing old command parameter", http.StatusBadRequest)
		return
	}
	if newCommandName == "" {
		http.Error(w, "Missing new command name parameter", http.StatusBadRequest)
		return
	}
	if newCommand == "" {
		http.Error(w, "Missing new command parameter", http.StatusBadRequest)
		return
	}

	err := webhooks.UpdateEntry(oldCommandName, oldCommand, newCommandName, newCommand)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
