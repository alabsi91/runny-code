package apiFiles

import (
	"encoding/json"
	"net/http"
	"path"
	"runny-code/common"
	"strings"
)

func ReadDirHandle(w http.ResponseWriter, r *http.Request) {
	files, err := readFiles(common.FilesDir)
	if err != nil {
		http.Error(w, "Error reading the files directory", http.StatusInternalServerError)
		return
	}

	// remove the leading `FilesDir` from each path
	filesList := make([]string, len(files))
	partToRemove := path.Clean(common.FilesDir) + "/"
	for i, file := range files {
		filesList[i] = strings.Replace(file, partToRemove, "", 1)
	}

	bytes, err := json.Marshal(filesList)
	if err != nil {
		http.Error(w, "Error encoding the files list to json", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}
