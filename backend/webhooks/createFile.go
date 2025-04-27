package webhooks

import (
	"runny-code/common"
	"os"
)

func CreateFile() error {
	_, err := os.Stat(common.WebhooksFile)
	if os.IsNotExist(err) {
		file, err := os.Create(common.WebhooksFile)
		if err != nil {
			return err
		}
		defer file.Close()

		_, err = file.WriteString("[]")
		if err != nil {
			return err
		}
	}
	return nil
}
