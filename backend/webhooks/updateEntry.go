package webhooks

import "fmt"

// UpdateEntry keeps the same uuid and updates commandName and command
func UpdateEntry(oldCommandName string, oldCommand string, newCommandName string, newCommand string) (err error) {
	for i, entry := range WebhookEntries {
		if entry.CommandName == oldCommandName && entry.Command == oldCommand {
			WebhookEntries[i].CommandName = newCommandName
			WebhookEntries[i].Command = newCommand
			err = writeToFile(WebhookEntries)
			return
		}
	}

	return fmt.Errorf("webhook for command '%s' not found", oldCommandName)
}
