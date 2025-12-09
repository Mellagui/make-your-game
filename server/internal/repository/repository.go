package repository

import (
	"encoding/json"
	models "make-your-game/server/internal/models"
	"os"
)

func GetScores() ([]models.PlayerScore, *models.ErrorJson) {
	file, err := os.OpenFile("server/internal/memory/data.json", os.O_RDWR, 0644)
	if err != nil {
		return nil, &models.ErrorJson{Status: 500, Message: "can't read file", Error: "500 - Internal Server Error"}
	}
	defer file.Close()

	var scores []models.PlayerScore
	if err = json.NewDecoder(file).Decode(&scores); err != nil {
		return nil, &models.ErrorJson{Status: 500, Message: "newDecoder fail to decode file data", Error: "500 - Internal Server Error"}
	}
	return scores, nil
}

func SetScores() ([]models.PlayerScore, *models.ErrorJson) {
	return nil, nil
}
