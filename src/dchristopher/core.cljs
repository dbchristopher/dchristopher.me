(ns dchristopher.core
  (:require [reagent.core :as reagent :refer [atom]]
            [dchristopher.index :as index]))

(enable-console-print!)

;; define your app data so that it doesn't get over-written on reload

(reagent/render-component [index/hello-world]
                          (. js/document (getElementById "app")))

(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)
