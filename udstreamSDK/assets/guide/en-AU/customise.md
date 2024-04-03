# Customising udStream

udStream can be customised and repackaged to allow organisations the ability to control branding or settings within the app.

## Settings

The **defaultsettings.json** file in the top-level application directory sets all settings that a user has not overriden. This file can be modified to set any or all settings in the application for new users. The simplest way to modify this file is to check your user settings file after opening and closing the application.

## Branding

In the **assets/branding** folder within the application directory there are three files that can be modified to control the branding and global settings.

  - **icon.png** is the icon used in the task bar and in the window chrome on operating systems that support that
  - **logo.png** is the logo shown on the login screen and on the welcome screen
  - **strings.json** controls a number of settings that allow deeper control of the application
    - {string} **appName** sets the name of the operating system window or browser tab
    - {string} **supportEmail** is shown in places where the user will look for support or contact details
    - {string} **supportURLConverting** is the URL the user is directed to when they click the link to get help from the convert modal
    - {boolean} **convertEnabled** if false (default true), entirely disables the convert system
    - {boolean} **exportEnabled** if false (default true), entirely disables the ability to export UDS files
    - {boolean} **filtersEnabled** if false (default true), entirely disables the tools that filter UDS files
    - {boolean} **logoutEnabled** if false (default true), the menu items to logout are hidden- other options to logout may still occur
    - {boolean} **forceLoginServer** if true (default false), the users settings (and defaultsettings.json) are overriden with the first server in the **loginServers** list
    - {array} **logincolours** set the colours of the login screen
    - {array} **loginServers** is a list of login servers that are offerred to the user; each item should have the following elements
      - {string} **name** the human readable name of the login server
      - {string} **url** the address of the login server
      - {string} **iconURL** the image/logo displayed beside the login server in the server list
    - {array} **languageSets** additional language sets (glyphs) to load at startup- supported list ["ChineseSimplifiedCommon", "ChineseFull", "Japanese", "Korean", "Cyrillic", "Thai", "Vietnamese"]


