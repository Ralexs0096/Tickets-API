#!/bin/bash

# Prompt for the required information
read -p "User name (e.g. aruiz): " user
read -p "Change type (feat, fix, etc.): " change_type
read -p "Section of the App: " section
read -p "Ticket description: " description

# Process the description
processed_description=$(echo "$description" | tr '[:upper:]' '[:lower:]' | sed -e 's/[^a-zA-Z0-9]/-/g' -e 's/--*/-/g' -e 's/^-//' -e 's/-$//')

# Format the branch name
branch_name="$user/$change_type/$section/$processed_description"

# Create the branch
git branch "$branch_name"

# Display the created branch name
echo "Branch created: $branch_name"

# Display the command to checkout the branch
echo "To switch to the new branch, use:"
echo "git checkout $branch_name"