import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('tree2files.createFoldersAndFiles', async () => {
        const treeInput = await vscode.window.showInputBox({
            prompt: 'Paste your folder and file structure tree',
            placeHolder: `monorepo
├── packages
│   ├── common
│   ├── web-app
│   └── browser-extension
├── package.json
└── tsconfig.base.json`
        });

        if (!treeInput) {
            vscode.window.showErrorMessage('No input provided!');
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found!');
            return;
        }

        const workspacePath = workspaceFolders[0].uri.fsPath;
        const { paths, files } = parseTreeStructure(treeInput, workspacePath);

        try {
            // Create directories
            for (const dir of paths) {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                    console.log(`Created directory: ${dir}`);
                }
            }

            // Create files
            for (const file of files) {
                const fileDir = path.dirname(file);
                if (!fs.existsSync(fileDir)) {
                    fs.mkdirSync(fileDir, { recursive: true });
                }
                if (!fs.existsSync(file)) {
                    fs.writeFileSync(file, '');
                    console.log(`Created file: ${file}`);
                }
            }

            vscode.window.showInformationMessage('Folders and files created successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Error creating structure: ${error}`);
            console.error(error);
        }
    });

    context.subscriptions.push(disposable);
}

function parseTreeStructure(tree: string, basePath: string): { paths: string[], files: string[] } {
    const lines = tree.split('\n');
    const paths: string[] = [];
    const files: string[] = [];
    const stack: string[] = [];

    // Common tree branch symbols
    const branchSymbols = /[│├└─┬┐┘┌┤┼]/g;

    lines.forEach((line, index) => {
        // Skip empty lines
        if (!line.trim()) return;

        // Calculate depth based on the original line's leading spaces and symbols
        const depth = Math.floor((line.search(/\S|$/) || 0) / 2);

        // Clean the line
        let cleanLine = line
            .replace(branchSymbols, '')     // Remove tree symbols
            .replace(/\s+/g, ' ')           // Normalize spaces
            .trim()                         // Remove leading/trailing spaces
            .replace(/^\/+/, '')            // Remove leading slashes
            .trim();

        if (!cleanLine) return;

        // Handle multiple items on the same line by splitting on common separators
        const lineItems = cleanLine.split(/\s+(?=\S+\.\w+$)|\s+(?=package\.json|tsconfig\.json|\.gitignore|\.env)/);

        lineItems.forEach(item => {
            if (!item.trim()) return;

            // Update stack for the current depth
            stack.length = depth;
            stack[depth] = item.trim();

            // Get cleaned path segments
            const pathSegments = stack
                .slice(0, depth + 1)
                .map(segment => segment.trim())
                .filter(segment => segment.length > 0);

            // Create full path
            const fullPath = path.join(basePath, ...pathSegments);

            // Determine if it's a file or directory
            const isFile = item.includes('.') || 
                          /\.(json|js|ts|txt|md|yaml|yml|xml|css|html|jsx|tsx)$/.test(item) ||
                          item === 'package.json' ||
                          item === 'tsconfig.json' ||
                          item === '.gitignore' ||
                          item === '.env';

            if (isFile) {
                files.push(fullPath);
            } else {
                paths.push(fullPath);
            }
        });
    });

    // Debug logging
    console.log('Directories to create:', paths);
    console.log('Files to create:', files);

    return { paths, files };
}

export function deactivate() {}