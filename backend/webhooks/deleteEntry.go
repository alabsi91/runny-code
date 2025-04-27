package webhooks

import "slices"

func DeleteEntry(commandName string, command string) (err error) {
	for i, entry := range WebhookEntries {
		if entry.CommandName == commandName && entry.Command == command {
			WebhookEntries = slices.Delete(WebhookEntries, i, i+1)
			err = writeToFile(WebhookEntries)
			return
		}
	}
	return
}