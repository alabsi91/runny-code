package webhooks

import (
	"runny-code/common"
	"encoding/json"
	"os"
)

func writeToFile(entries []WebhookEntry) (err error) {
	err = CreateFile()
	if err != nil {
		return
	}

	// to json
	jsonBytes, err := json.Marshal(entries)
	if err != nil {
		return
	}

	file, err := os.OpenFile(common.WebhooksFile, os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		return
	}
	defer file.Close()

	file.Write(jsonBytes)

	return nil
}
