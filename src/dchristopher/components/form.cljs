(ns dchristopher.components.form
  (:require [reagent.core :as reagent :refer [atom]]))

(defn contact []
  [:form {:name "contact" :method "POST" :data-netlify "true"}
   [:input {:type "hidden" :name "form-name" :value "contact"}]
   [:h2 "Say Hello!"]
   [:p
    [:label "Your Name:"]
    [:input {:type "text" :name "name"}]]
   [:p
    [:label "Your Email:"]
    [:input {:type "email" :name "email"}]]
   [:p
    [:label "Message:"]
    [:textarea {:name "message"}]]
   [:p [:button {:type "submit"} "Send"]]])
