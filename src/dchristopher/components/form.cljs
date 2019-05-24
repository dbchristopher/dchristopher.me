(ns dchristopher.components.form
  (:require [reagent.core :as reagent :refer [atom]]))

(defn contact []
  [:form {:name "contact" :method "POST" :data-netlify "true"}
   [:input.input {:type "hidden" :name "form-name" :value "contact"}]
   [:p
    [:label "Name:"]
    [:input.input {:type "text" :name "name"}]]
   [:p
    [:label "Email:"]
    [:input.input {:type "email" :name "email"}]]
   [:p
    [:label "Message:"]
    [:textarea.textarea {:name "message" :rows "5"}]]
   [:p [:button.submit {:type "submit"} "Send"]]])
