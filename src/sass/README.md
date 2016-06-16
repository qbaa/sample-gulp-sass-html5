# Main file
Reguła 7-1 - https://sass-guidelin.es/#architecture

sass/
|
|– base/
|   |– _reset.scss       # Reset/normalize
|   |– _typography.scss  # Reguły dot. typografii
|   …                    # Itd.
|
|– components/
|   |– _buttons.scss     # Przyciski
|   |– _carousel.scss    # Karuzela
|   |– _cover.scss       # Okładka
|   |– _dropdown.scss    # Rozwijane menu
|   …                    # Itd.
|
|– layout/
|   |– _navigation.scss  # Nawigacja
|   |– _grid.scss        # Grid system
|   |– _header.scss      # Nagłówek
|   |– _footer.scss      # Stopka
|   |– _sidebar.scss     # Pasek boczny
|   |– _forms.scss       # Formularze
|   …                    # Itd.
|
|– pages/
|   |– _home.scss        # Style dla strony głównej
|   |– _contact.scss     # Style dla konkretnej podstrony
|   …                    # Itd.
|
|– themes/
|   |– _theme.scss       # Główny motyw
|   |– _admin.scss       # Motyw dla panelu administratora
|   …                    # Itd.
|
|– utils/
|   |– _variables.scss   # Zmienne Sassa
|   |– _functions.scss   # Funkcje Sassa
|   |– _mixins.scss      # Mixiny Sassa
|   |– _helpers.scss     # Pomocnicze klasy i selektory
|
|– vendors/
|   |– _bootstrap.scss   # Bootstrap
|   |– _jquery-ui.scss   # jQuery UI
|   …                    # Itd.
|
|
 – main.scss             # Główny plik Sassa

The main file (usually labelled `main.scss`) should be the only Sass file from the whole code base not to begin with an underscore. This file should not contain anything but `@import` and comments.

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Main file](http://sass-guidelin.es/#main-file)
