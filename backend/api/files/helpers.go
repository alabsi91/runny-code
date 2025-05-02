package apiFiles

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"path"
	"runny-code/common"
	"strings"
	"unicode"

	"github.com/bmatcuk/doublestar"
)

type File struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

func (f *File) RemoveLeading(leadingPath string) {
	partToRemove := path.Clean(leadingPath) + "/"
	f.Path = strings.Replace(f.Path, partToRemove, "", 1)
}

type Folder struct {
	Name    string   `json:"name"`
	Path    string   `json:"path"`
	Folders []Folder `json:"folders"`
	Files   []File   `json:"files"`
}

func (f *Folder) RemoveLeading(leadingPath string) {
	partToRemove := path.Clean(leadingPath) + "/"
	f.Path = strings.Replace(f.Path, partToRemove, "", 1)
	for i := range f.Folders {
		f.Folders[i].RemoveLeading(leadingPath)
	}
	for i := range f.Files {
		f.Files[i].RemoveLeading(leadingPath)
	}
}

// readFiles reads the files and folders in the given directory
func readFiles(dirPath string) (rootFolder Folder, err error) {
	rootFolder = Folder{
		Name:    path.Base(dirPath),
		Path:    dirPath,
		Folders: make([]Folder, 0),
		Files:   make([]File, 0),
	}

	entries, err := os.ReadDir(dirPath)
	if err != nil {
		return
	}

	for i := range entries {
		entry := entries[i]
		entryName := entry.Name()
		entryPath := path.Join(dirPath, entryName)

		if isExcluded(entryPath) {
			continue
		}

		if entry.IsDir() {
			innerFolders, _ := readFiles(entryPath)
			rootFolder.Folders = append(rootFolder.Folders, innerFolders)
			continue
		}

		if !isIncluded(entryPath) {
			continue
		}

		rootFolder.Files = append(rootFolder.Files, File{
			Name: entryName,
			Path: entryPath,
		})
	}

	return
}

// moveToPath moves/renames the file or folder at the given fromPath to the given toPath
func moveToPath(fromPath string, toPath string) (err error) {
	// Check if the destination file or folder already exists
	if _, err := os.Stat(toPath); !errors.Is(err, os.ErrNotExist) {
		return fmt.Errorf("file or folder already exists at destination: %s", toPath)
	}

	// Attempt to move the file or folder
	if err := os.Rename(fromPath, toPath); err != nil {
		return fmt.Errorf("failed to move file or folder: %w", err)
	}

	return nil
}

// deletePath deletes the file or folder at the given path
func deletePath(path string) (err error) {
	// Check if the file or folder exists
	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
		return fmt.Errorf("the path does not exist: %s", path)
	}

	// Attempt to delete the file or folder
	if err := os.RemoveAll(path); err != nil {
		return fmt.Errorf("failed to delete file or folder: %w", err)
	}

	return nil
}

// createFolder creates a new folder (New Folder) in the given directory and returns its path
func createFolder(dirPath string) (newDirPath string, err error) {
	dirName := "New Folder"
	dirNum := 0

	for {
		var candidate string
		if dirNum == 0 {
			candidate = path.Join(dirPath, dirName)
		} else {
			candidate = path.Join(dirPath, fmt.Sprintf("%s (%d)", dirName, dirNum))
		}

		// Check if the directory exists
		if _, statErr := os.Stat(candidate); errors.Is(statErr, os.ErrNotExist) {
			newDirPath = candidate
			break
		} else if statErr != nil {
			return "", fmt.Errorf("failed to stat path: %w", statErr)
		}

		// Increment dirNum for the next attempt
		dirNum++
	}

	// Create the directory
	if err := os.Mkdir(newDirPath, os.ModePerm); err != nil {
		return "", fmt.Errorf("failed to create directory: %w", err)
	}

	return newDirPath, nil
}

// createFile creates a new file (New File.txt) in the given directory and returns its path
func createFile(dirPath string) (newFilePath string, err error) {
	fileName := "New File"
	ext := ".txt"
	fileNum := 0

	for {
		var candidate string
		if fileNum == 0 {
			candidate = path.Join(dirPath, fileName+ext)
		} else {
			candidate = path.Join(dirPath, fmt.Sprintf("%s (%d)%s", fileName, fileNum, ext))
		}

		// Check if the directory exists
		if _, statErr := os.Stat(candidate); errors.Is(statErr, os.ErrNotExist) {
			newFilePath = candidate
			break
		} else if statErr != nil {
			return "", fmt.Errorf("failed to stat path: %w", statErr)
		}

		// Increment fileNum for the next attempt
		fileNum++
	}

	if err = os.WriteFile(newFilePath, []byte(""), os.ModePerm); err != nil {
		return
	}

	return
}

// isExcluded returns true if the file path matches any of the exclude patterns
func isExcluded(filePath string) bool {
	for _, pattern := range common.Exclude_Patterns_Env {
		isExcluded, err := doublestar.PathMatch(pattern, filePath)
		if err == nil && isExcluded {
			return true
		}
	}
	return false
}

// isIncluded returns true if the file path matches any of the include patterns
func isIncluded(filePath string) bool {
	for _, pattern := range common.Include_Patterns_Env {
		isIncluded, err := doublestar.PathMatch(pattern, filePath)
		if err == nil && isIncluded {
			return true
		}
	}
	return false
}

// readTextFile reads the content of a file if it is a text file, returning an error otherwise.
func readTextFile(filePath string) ([]byte, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Read a small chunk to check if it's a text file
	reader := bufio.NewReader(file)
	buffer := make([]byte, 1024)
	n, err := reader.Read(buffer)
	if err != nil && err.Error() != "EOF" {
		return nil, err
	}

	// Check if the bytes are mostly printable characters
	for _, b := range buffer[:n] {
		if b == 0 || (!unicode.IsPrint(rune(b)) && !unicode.IsSpace(rune(b))) {
			return nil, errors.New("file is not a text file")
		}
	}

	// If the check passes, read the full file
	file.Seek(0, 0) // Reset file pointer to the beginning
	content, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	return content, nil
}
