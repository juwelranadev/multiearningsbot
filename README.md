<!DOCTYPE html>
<html>
<head>
    <title>HTML Button Example</title>
    <style>
        button {
            background-color: #4CAF50; /* Green background */
            color: white; /* White text */
            padding: 10px 20px; /* Padding inside the button */
            border: none; /* No border */
            border-radius: 5px; /* Rounded corners */
            cursor: pointer; /* Cursor changes to pointer on hover */
            font-size: 16px;
        }

        button:hover {
            background-color: #45a049; /* Slightly darker green on hover */
        }
    </style>
</head>
<body>

    <h2>HTML Button Example</h2>
    <p>Click the button below to see it in action:</p>

    <button onclick="alert('Button clicked!')">Click Me!</button>

</body>
</html>
