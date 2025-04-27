package commands

import (
	"bufio"
	"os"
	"path"
	"slices"
	"strings"
)

// RemoveCommandFromFile removes a specific command and associated metadata from a file.
func RemoveCommandFromFile(filePath string, targetCommand ParsedCommand) error {
	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	fileStrLines:= []string{}
	linesIndicesToRemove := []int{}

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		// Skip empty, comment, and directive lines
		if line == "" || strings.HasPrefix(line, "#") || strings.HasPrefix(line, "@") {
			fileStrLines = append(fileStrLines, line)
			continue
		}

		// not our target command
		if line != targetCommand.Command {
			fileStrLines = append(fileStrLines, line)
			continue
		}

		for  i, previousLine := range slices.Backward(fileStrLines) {
			if !strings.HasPrefix(previousLine, "@") {
				break
			}
			linesIndicesToRemove = append(linesIndicesToRemove, i)
		}
	}

	// Remove the lines
	for _, index := range linesIndicesToRemove {
		fileStrLines = slices.Delete(fileStrLines, index, index+1)
	}

	// Check for scanning errors
	if err := scanner.Err(); err != nil {
		return err
	}

	// Write the updated content back to the file
	tempFile, err := os.CreateTemp(path.Dir(filePath), "tmp_commands")
	if err != nil {
		return err
	}
	defer os.Remove(tempFile.Name())

	writer := bufio.NewWriter(tempFile)
	for _, line := range fileStrLines {
		_, err := writer.WriteString(line + "\n")
		if err != nil {
			return err
		}
	}
	writer.Flush()

	// Replace the original file with the temp file
	if err := os.Rename(tempFile.Name(), filePath); err != nil {
		return err
	}

	return nil
}
