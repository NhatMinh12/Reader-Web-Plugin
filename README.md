# Reader-Web-Plugin

## Overview

A browser extension that leverages the power of OpenAI's GPT-3.5 model to provide users with intelligent, contextual information about any webpage they are visiting.
It allows users to "ask" questions about the current webpage's content, obtaining informative and relevant responses from the AI, whether it's asking for a summary of a lengthy article, clarification on technical jargon, or even a request to fact-check a statement.

## Key features

1. Contextual Querying: Users can ask questions about the webpage they're currently visiting, and the plugin will provide answers in real time, leveraging the GPT-3.5 model's ability to understand and generate human-like text.
2. Highlight and Ask: Users can highlight specific text on a webpage and ask questions about it specifically, allowing for detailed inquiries about complex topics.
3. Page Summary: Generate a succinct summary of a webpage, ideal for long articles or dense technical documentation.
4. Fact-checking: Users can ask the plugin to verify information on the webpage using its built-in ability to compare against known data.

## Installation
To run this project locally, please complete the following steps:
1. Download Node.js: https://nodejs.org/en/download
2. Clone the repository and install dependencies
```
git clone https://github.com/NhatMinh12/Reader-Web-Plugin.git
cd Reader-Web-Plugin
npm install
```
3. Start the development server
```
npm start
```
After that, the project should automatically appear in your computer's default browser. If not, you can always navigate here to check out the local copy
```
http://localhost:3000/
```

## Unpack the plugin onto your web browser
After verifying that the project is installed correctly, you can then proceed to "upload" it as a plugin to your chosen web browser:
1. Run the following command in the local project directory
```
npm run build
```
This command will create a new folder, "build", in your project directory. This is the folder we will upload to the browser.<br>  

2. Go to the extensions page of your browser. Here I'm using Microsoft Edge.

![Edge Extensions](https://i.imgur.com/GgPNTPs.png)

3. Turn on developer mode  

![Developer mode](https://i.imgur.com/8iVwqLU.png)  

4. Click on "Load unpacked"

![Load unpacked](https://i.imgur.com/RyKm8er.png)  

5. Select the "build" folder that was just created

![build folder](https://i.imgur.com/5nqnze2.png)  

The extension should now be listed in your browser's extensions list.
