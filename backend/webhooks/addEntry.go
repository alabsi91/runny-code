package webhooks

import (
	"fmt"
)

// AddEntry adds a new webhook
// Adds uuid to the entry
// Adds the entry to the WebhookEntries
// Writes the WebhookEntries to the file
// Returns the uuid
func AddEntry(entry *WebhookEntry) (err error) {
	var foundEntry *WebhookEntry
	for _, e := range WebhookEntries {
		if e.CommandName == entry.CommandName && e.Command == entry.Command {
			foundEntry = &e
			break
		}
	}
	if foundEntry != nil {
		return fmt.Errorf("webhook for command '%s' already exists", entry.CommandName)
	}
	
	entry.UUID = generateUUID()
	WebhookEntries = append(WebhookEntries, *entry)
	err = writeToFile(WebhookEntries)
	return err
}

