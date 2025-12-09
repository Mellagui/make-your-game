package service

import (
	models "make-your-game/server/internal/models"
	repository "make-your-game/server/internal/repository"
	"net/http"
	"strconv"
)

func GetScores(w http.ResponseWriter, r *http.Request) (models.Data, *models.ErrorJson) {
	var query = r.URL.Query().Get("page")
	if query == "" {
		return models.Data{}, &models.ErrorJson{Status: 400, Message: "query is empty", Error: "400 - Bad Request"}
	}

	currentPage, err := strconv.Atoi(query)
	if err != nil || currentPage < 1 {
		return models.Data{}, &models.ErrorJson{Status: 400, Message: "strconv err - not a number", Error: "400 - Bad Request"}
	}

	scores, errJson := repository.GetScores()
	if errJson != nil {
		return models.Data{}, errJson
	}

	var data models.Data

	data.Page.Current = currentPage // get number from frontend by query

	data.Page.Max = int(float64(len(scores)) / float64(5))
	if len(scores)%5 != 0 {
		data.Page.Max++
	}

	if data.Page.Max == 1 {
		data.Scores = scores
	} else {
		if currentPage >= data.Page.Max {
			data.Scores = scores[len(scores)-5:]
		} else if currentPage <= 1 {
			data.Scores = scores[:5]
		} else {
			data.Scores = scores[currentPage*5-5 : currentPage*5]
		}
	}

	return data, nil
}
