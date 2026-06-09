# Windows Installer Directory

This folder is reserved for pre-built Windows installer binaries (`.exe` files).

## How to Build the Installer

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build the Electron Application**:
   ```bash
   npm run build:electron
   ```

3. **Locate the Installer**:
   - The installer will be generated in the `dist-electron/` directory
   - File name format: `AI-Browser-Setup-{version}.exe`

4. **Optional - Copy to This Folder**:
   If you want to include the installer directly in this repository:
   ```bash
   cp dist-electron/AI-Browser-Setup-*.exe windows-installer/
   ```

## ⚠️ Important Notes

- **Git LFS**: If you plan to commit large `.exe` files (>100MB), consider using Git LFS:
  ```bash
  git lfs install
  git lfs track "*.exe"
  ```

- **File Size**: Electron installers can be large (50-150MB). Consider distributing via GitHub Releases instead of committing to the repository.

- **GitHub Releases** (Recommended):
  Instead of committing installers to the repo, use GitHub Releases:
  ```bash
  # After building
  gh release create v1.0.0 dist-electron/*.exe --title "v1.0.0" --notes "Initial release"
  ```

## Distribution Options

### Option 1: GitHub Releases (Recommended)
- Upload installers to GitHub Releases
- Users download from releases page
- Keeps repository lightweight

### Option 2: Commit to This Folder
- Only for small installers or with Git LFS
- Increases repository size significantly

### Option 3: External Hosting
- Host on cloud storage (S3, Azure, etc.)
- Provide download links in README
