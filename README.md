# Tree Structure to Files - VS Code Extension

A simple VS Code extension that converts a tree-like folder structure into actual directories and files.

## Usage

1. Open command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Run `Create Folders and Files from Tree Structure`
3. Paste your tree structure in the input box

### Supported Formats

```
# Standard Format
root
├── folder1
│   ├── file1.txt
│   └── file2.txt
└── folder2
    └── file3.txt

# Compact Format (same line files)
root
├── folder1
│   └── file1.txt file2.txt package.json
└── folder2
```

### Features

- Creates nested directory structures
- Handles multiple files on the same line
- Supports common tree symbols (├, │, └, ─)
- Auto-creates parent directories for files
- Skips existing files/folders

## Examples

```
# Input
monorepo
├── packages
│   ├── common
│   ├── web-app
│   └── browser-extension
├── package.json
└── tsconfig.json

# Result
monorepo/
  ├── packages/
  │   ├── common/
  │   ├── web-app/
  │   └── browser-extension/
  ├── package.json
  └── tsconfig.json
```

## Potential Improvements

1. **File Content Templates**
   - Add basic content for common file types
   - Custom templates for package.json, tsconfig.json, etc.

2. **Enhanced UI**
   - Tree preview before creation
   - Visual tree builder
   - Progress indicator for large structures

3. **Configuration Options**
   - Customizable file templates
   - Ignore patterns
   - Default root directory setting

4. **Advanced Features**
   - Copy existing tree structure
   - Generate tree from existing folders
   - Export tree structure to different formats
   - Bulk file content initialization
   - Integration with git init

5. **Error Handling**
   - Better validation of input format
   - Detailed error messages
   - Rollback on partial failures
   - Permission checks before creation

6. **Format Support**
   - More tree format variations
   - Custom symbols support
   - Import from JSON/YAML

## Known Limitations

- No file content initialization
- Limited tree format validation
- No undo operation
- No support for file sizes or permissions
- Basic error handling

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT