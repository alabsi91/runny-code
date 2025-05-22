package apiCommands

import (
	"encoding/json"
	"fmt"
	"net/http"
	"runny-code/commands"
)

type ExecuteCommandResponse struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}

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

	streamOutput := r.URL.Query().Get("streamOutput") == "true"

	// Find the command
	var parsedCommand *commands.ParsedCommand
	for _, cmd := range commands.ParsedCommandsList {
		if cmd.Name == commandName && cmd.Command == commandStr {
			parsedCommand = &cmd
			break
		}
	}

	// Not found
	if parsedCommand == nil {
		http.Error(w, fmt.Sprintf("Command '%s' not found", commandName), http.StatusNotFound)
		return
	}

	// Get command arguments (input)
	var data map[string]string
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	// Prepare the command to execute
	commandToExecute, err := commands.FillCommand(parsedCommand.Command, parsedCommand.Variables, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !streamOutput {
		output, err := commands.SShExecute(commandToExecute)
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to execute command '%s': %s", commandToExecute, err.Error()), http.StatusInternalServerError)
		}
		w.Write(output)
		return
	}

	// Set response headers for streaming
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Cache-Control", "no-store")
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("X-Accel-Buffering", "no")
	w.Header().Set("Transfer-Encoding", "chunked")

	// Use http.Flusher to stream output
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming not supported", http.StatusInternalServerError)
		return
	}

	// Execute the command and stream output
	err = commands.SShExecuteStream(commandToExecute, func(stdout string, stderr string) {
		w.Write([]byte(stdout + stderr) )
		flusher.Flush()
	})

	if err != nil {
		fmt.Fprint(w, "")
		flusher.Flush()
	}
}
