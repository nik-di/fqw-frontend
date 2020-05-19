# Final work on html and css at the web development course
## [News Explorer](https://nik-di.github.io/fqw-frontend/)

`Версия 0.1.0`
Ссылка на проект https://github.com/nik-di/fqw-frontend

* В текущем проекте реализована вёрстка и настроен Webpack.
* Чтобы проверить некоторые скрытые секции, например попап, необходимо добавить соответствующий класс с модификатором. Необходимые классы указаны здесь и в комментариях в самом HTML.

#### Для проверки скрытых блоков или элементов понадобятся следующие классы:
`header-top-panel__link_active` - нижняя полоса под ссылкой
`header-top-panel__link_hidden` - скрывает ссылку на страницу со статьями для неавторизованных пользователей
`header-top-panel__btn-logout-icon_hidden` - скрывает значек logout
`popup_visible` - открывает попап
`popup__button_disabled` - деактивация кнопки попапа
`reloader_visible` - чтобы увидеть блок
`circle-preloader_visible` - открывает попап
`preloader-nothing_visible` - открывает попап
`main-content_is-visible` - показать блок с результатами поиска
`mobile-menu-popup_unvisible` - скрывает попап мобильного меню

### Установка
#### Git command:
1. Скачать репозиторий:
```git clone https://github.com/nik-di/fqw-frontend.git```
2. Перейти в директорию с каталогом
```cd fqw/```
3. Установить npm-зависимости:
```npm i```
4. Произвести сборку проекта:
```npm run build```
5. Запустить проект на локальном сервере:
```npm run dev```
