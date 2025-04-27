package apiFiles

import (
	"os"
	"path"
	"runny-code/common"

	"github.com/bmatcuk/doublestar"
)

func readFiles(dirPath string) (paths []string, err error) {
	paths = make([]string, 0)

	entries, err := os.ReadDir(dirPath)
	if err != nil {
		return
	}

	for i := range entries {
		entry := entries[i]
		entryName := entry.Name()
		entryPath := path.Join(dirPath, entryName)

		isExcluded := false
		for _, pattern := range common.Exclude_Patterns_Env {
			isExcluded, err = doublestar.PathMatch(pattern, entryPath)
			if err == nil && isExcluded {
				break
			}
		}
		if isExcluded {
			continue
		}

		if entry.IsDir() {
			innerPaths, _ := readFiles(entryPath)
			paths = append(paths, innerPaths...)
			continue
		}

		isIncluded := false
		for _, pattern := range common.Include_Patterns_Env {
			isIncluded, err = doublestar.PathMatch(pattern, entryPath)
			if err == nil && isIncluded {
				break
			}
		}
		if !isIncluded {
			continue
		}

		paths = append(paths, path.Join(dirPath, entryName))
	}

	return
}
