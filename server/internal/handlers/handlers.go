package handlers

import (
	"html/template"
	"net/http"
	"path/filepath"
	"encoding/json"
	utils "make-your-game/server/internal/utils"
	models "make-your-game/server/internal/models"
	service "make-your-game/server/internal/service"
)

func Home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		utils.WriteJsonErrors(w, models.ErrorJson{Status: http.StatusNotFound, Message: "Home: Page-Not-Found", Error: "404 - Page Not Found"});
		return
	}

	if r.Method != http.MethodGet {
		utils.WriteJsonErrors(w, models.ErrorJson{Status: http.StatusMethodNotAllowed, Message: "Home: Method-Not-Allowed", Error: "405 - Method Not Allowed"});
		return
	}

	tmpl, err := template.ParseFiles(filepath.Join(models.TemplatesPath, "index.html"))
	if err != nil {
		utils.WriteJsonErrors(w, models.ErrorJson{Status: http.StatusInternalServerError, Message: "Home: Internal-Server-Error", Error: "500 - Internal Server Error"});
		return
	}

	if err = tmpl.Execute(w, nil); err != nil {
		utils.WriteJsonErrors(w, models.ErrorJson{Status: http.StatusInternalServerError, Message: "Home: Internal-Server-Error", Error: "500 - Internal Server Error"});
	}
}

func GetScores(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/get_scores" {
		utils.WriteJsonErrors(w, models.ErrorJson{Status: http.StatusNotFound, Message: "Home: Page-Not-Found", Error: "404 - Page Not Found"});
		return
	}

	if r.Method != http.MethodGet {
		utils.WriteJsonErrors(w, models.ErrorJson{Status: http.StatusMethodNotAllowed, Message: "Home: Method-Not-Allowed", Error: "405 - Method Not Allowed"});
		return
	}

	data, errJson := service.GetScores(w, r) 
	if errJson != nil {
		utils.WriteJsonErrors(w, *errJson);
		return
	}

	w.Header().Set("content-type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		utils.WriteJsonErrors(w, models.ErrorJson{Status: http.StatusInternalServerError, Message: "GetScore: Internal-Server-Error", Error: "500 - Internal Server Error"});
	}
}

func SetScores(w http.ResponseWriter, r *http.Request) {

}