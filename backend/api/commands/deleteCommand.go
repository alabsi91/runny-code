package apiCommands

import (
	"fmt"
	"net/http"
	"runny-code/commands"
	"runny-code/common"
	"runny-code/webhooks"
)

func DeleteCommandHandle(w http.ResponseWriter, r *http.Request) {
	if common.Allow_Command_Manipulation_Env != "true" {
		http.Error(w, "Unauthorized: Command manipulation is disabled", http.StatusUnauthorized)
		return
	}

	commandName := r.URL.Query().Get("commandName")
	command := r.URL.Query().Get("command")
	keepWebhook := r.URL.Query().Get("keepWebhook")
	if commandName == "" {
		http.Error(w, "Missing command name parameter", http.StatusBadRequest)
		return
	}
	if command == "" {
		http.Error(w, "Missing command parameter", http.StatusBadRequest)
		return
	}

	foundCommand := commands.FindCommand(commands.ParsedCommandsList, commandName)
	if foundCommand == nil {
		http.Error(w, fmt.Sprintf("Command '%s' does not exists", commandName), http.StatusBadRequest)
		return
	}

	err := commands.RemoveCommandFromFile(common.CommandsFile, *foundCommand)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// update the commands list after adding the new command
	commandsList, err := commands.ParseCommands(common.CommandsFile)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	commands.ParsedCommandsList = commandsList

	// delete the webhook if it exists (ignores errors)
	if keepWebhook != "true" {
		webhooks.DeleteEntry(commandName, command)
	}

	w.Write([]byte("Command removed successfully"))
}
