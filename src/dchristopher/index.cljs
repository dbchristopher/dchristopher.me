(ns dchristopher.index
  (:require [reagent.core :as reagent :refer [atom]]
            [dchristopher.components.form :as form]))

(defonce js-position (reagent/atom 0))
(defonce eng-position (reagent/atom 0))

(defn inc-decimal [val] (+ val 0.01))
(defn dec-decimal [val] (- val 0.01))

(js/setInterval  #(swap! js-position inc-decimal 20))
(js/setInterval  #(swap! eng-position dec-decimal 20))

(defn hello-world []
  [:div
   [:section.content-wrapper
    [:header
     [:div
      [:h1.name "Daniel Christopher"]]
     [:div
      [:hr]]]
    [:p.statement "React developer, wannabe chef, occasional artist, and clojure fanboy."]]

   [:div.display-wrapper
    [:h1.display.javascript {:style {:transform (str "translateX(" @js-position "px)")}} "Javascript"]
    [:h1.display.engineer {:style {:transform (str "translateX(" @eng-position "px)")}} "Engineer"]]

   [:div.section-group
    [:section.content-wrapper
     [:div.history
      [:h2 "A Brief History"]
      [:p "A web Engineer with 15 years of technical experience, I’ve focused primarily on front-end technologies, including React, Redux, HTML5/SCSS, and ES6."]
      [:p "Major themes in my work history include the intersection of technology and user experience, as well as data-driven optimizations."]]]
    [:section.content-wrapper
     [:div.experiments
      [:h2 "Open Source Experiments"]
      [:ul.experiment-list
       [:li.experiment-item
        [:a {:href "http://labs.uxmonk.com/simon-says/"} "Simon Says: Memory Match Game"]]
       [:li.experiment-item
        [:a {:href "https://www.spymaster.rocks"} "Spymaster Word Game"]]]]]]

   [:section.content-wrapper.form-wrapper
    [:h2 "Say Hello!"]

    [:div.links
     [:a {:href "/assets/resume-public.pdf" :download true} "Resume"]
     [:span "|"]
     [:a {:href "https://www.github.com/dbchristopher"} "Github"]
     [:span "|"]
     [:a {:href "https://twitter.com/danchristopher"} "Twitter"]
     [:span "|"]
     [:a {:href "https://www.instagram.com/dxchristopher"} "Instagram"]]

    [:div (form/contact)]]])

