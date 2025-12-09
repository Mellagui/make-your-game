package utils

import (
	"encoding/json"
	"log"
	"net/http"

	models "make-your-game/server/internal/models"
)

func WriteJsonErrors(w http.ResponseWriter, errJson models.ErrorJson) {
	w.WriteHeader(errJson.Status);
	log.Printf("%v", errJson.Message);
	json.NewEncoder(w).Encode(errJson);
}

func WriteDataBack(w http.ResponseWriter, data any) {
	w.WriteHeader(200);
	json.NewEncoder(w).Encode(&data);
}

// converte time