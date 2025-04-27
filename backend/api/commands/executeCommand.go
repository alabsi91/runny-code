package apiCommands

import (
	"encoding/json"
	"fmt"
	"net/http"
	"runny-code/commands"
)

func ExecuteCommandHandle(w http.ResponseWriter, r *http.Request) {
	commandName := r.URL.Query().Get("name")
	if commandName == "" {
		http.Error(w, "Missing command name parameter", http.StatusBadRequest)
		return
	}

	commandStr := r.URL.Query().Get("command")
	if commandStr == "" {
		http.Error(w, "Missing command parameter", http.StatusBadRequest)
		return
	}

	// Find the command
	var parsedCommand *commands.ParsedCommand
	for _, cmd := range commands.ParsedCommandsList {
		if cmd.Name == commandName && cmd.Command == commandStr {
			parsedCommand = &cmd
			break
		}
	}

	// not found
	if parsedCommand == nil {
		http.Error(w, fmt.Sprintf("Command '%s' not found", commandName), http.StatusNotFound)
		return
	}

	// get command arguments (input)
	var data map[string]string
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	commandToExecute, err := commands.FillCommand(parsedCommand.Command, parsedCommand.Variables, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	output, err := commands.SShExecute(commandToExecute)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to execute command '%s': %s", commandToExecute, err.Error()), http.StatusInternalServerError)
	}

	w.Write(output)
}
