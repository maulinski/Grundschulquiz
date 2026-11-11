# Grundschulquiz – JSONbin setup

A JSONbin access key must not be committed to this public repository. To synchronize, open the deployed quiz on each device and enter a restricted JSONbin access key with read and update permissions for the quiz bin. The key is saved in that browser's localStorage.

Do not put a JSONbin master key in this file. The application stores the bin ID in `script.js` and expects the bin record to have the shape `{ "profiles": [] }`.
