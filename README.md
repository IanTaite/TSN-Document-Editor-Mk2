# TSN Document Editor Mk2

This project is for exploring an architecture in which a reactive form is used to present a document for editing. The document
consists of layers, and layers consist of components. The document, layers and components each have their own properties which
can be simple strings, numbers and booleans or objects, or arrays of the same.

The main questions are

- What are the options for splitting a giant form down into smaller pieces
- What are the implications of driving this design from a reactive form rather than the alternatives which might include presenting the UI using components based off the api data model.

When the app runs, the browser window is split into two parts. The left pane shows the document editor, the right pane shows some diagnostics in lieu of a document viewer which hasn't been written yet.

This repo contains no customer data, no proprietary tech, no passwords or keys.

This app makes no API calls and works entirely in the browser. All state is lost on browser refresh.
