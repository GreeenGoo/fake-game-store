import { useState } from "react"
import "./styles/CreateUpdateGame.css"

type CreateUpdateGameProps = {
  gameTitle: string
  gameDescription: string
  newGameGenres: string[]
  newGamePlayerSupport: string[]
  genresList: string[]
  playerSupportList: string[]
  thumbnail: string
  images: string[]
  developer: string
  releaseDate: Date
  systemRequirements: string
  price: number
  handlenewGameChanges: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
  handleRemoveImage: (image: string) => void
  handleCancel: () => void
  handleSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleAddImage: (imageURL: string) => void
  handleAddThumbnail: (imageURL: string) => void
}

export default function CreateUpdateGameForm({
  gameTitle,
  gameDescription,
  newGameGenres,
  newGamePlayerSupport,
  genresList,
  playerSupportList,
  thumbnail,
  images,
  developer,
  releaseDate,
  systemRequirements,
  price,
  handlenewGameChanges,
  handleRemoveImage,
  handleCancel,
  handleSave,
  handleAddImage,
  handleAddThumbnail
}: CreateUpdateGameProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isOtherDialogOpen, setIsOtherDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const handleInputClick = (event: React.MouseEvent) => {
    event.preventDefault()
    if (event.target.name === "thumbnail") setIsOtherDialogOpen(true)
    else if (event.target.name === "images") setIsDialogOpen(true)
  }

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setIsDialogOpen(false)
    setIsOtherDialogOpen(false)
    setImageUrl("")
  }

  const handleDialogOk = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if (imageUrl.trim()) {
      if (event.currentTarget.name === "images") handleAddImage(imageUrl)
      else if (event.currentTarget.name === "thumbnail") handleAddThumbnail(imageUrl)
    }
    handleCloseDialog(event)
  }

  return (
    <form className="form-container">
      <div className="form-content">
        <div className="form-header">
          <h2>New Game</h2>
        </div>

        <div className="grid-container">
          <div className="input-container-game-title">
            <label htmlFor="game_title" className="input-label-game-title">
              Game Title
            </label>
            <input
              id="name"
              name="name"
              value={gameTitle}
              onChange={handlenewGameChanges}
              type="text"
              placeholder="Assassin's Creed"
              className="input-field-game-title"
            />
          </div>

          <div className="textarea-container-description">
            <label htmlFor="description" className="textarea-label-description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={gameDescription}
              onChange={handlenewGameChanges}
              placeholder="Assassin's Creed is an action-adventure game series..."
              className="textarea-field-description"
            />
          </div>

          <div className="select-container-genres">
            <label htmlFor="genres" className="select-label-genres">
              Select Genres
            </label>
            <select
              id="genreList"
              name="genreList"
              multiple
              value={newGameGenres}
              onChange={handlenewGameChanges}
              className="select-field-genres"
            >
              {genresList.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <ul className="genre-list">
              {newGameGenres &&
                Array.isArray(newGameGenres) &&
                newGameGenres.map((genre, index) => <li key={index}>{genre}</li>)}
            </ul>
          </div>

          <div className="select-container-player-support">
            <label htmlFor="playerSupport" className="select-label-player-support">
              Select Player Supports
            </label>
            <select
              id="playerSupport"
              name="playerSupport"
              multiple
              value={newGamePlayerSupport}
              onChange={handlenewGameChanges}
              className="select-field-player-support"
            >
              {playerSupportList.map((playerSupport, index) => (
                <option key={index} value={playerSupport}>
                  {playerSupport}
                </option>
              ))}
            </select>
            <ul className="player-support-list">
              {newGamePlayerSupport.map((support: string, index: number) => (
                <li key={index}>{support}</li>
              ))}
            </ul>
          </div>

          <div className="thumbnail-container">
            <label htmlFor="thumbnail" className="thumbnail-label">
              Thumbnail
            </label>
            <div className="mt-2 flex items-center">
              {thumbnail ? (
                <img src={thumbnail as string} alt="Thumbnail" className="thumbnail-image" />
              ) : (
                <svg
                  className="icon-default"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 1c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <button
                id="thumbnail"
                name="thumbnail"
                onClick={handleInputClick}
                className="thumbnail-upload-button"
              >
                Upload Thumbnail
              </button>

              {isOtherDialogOpen && (
                <div className="dialog-overlay" role="dialog">
                  <div className="dialog-box">
                    <h2 className="dialog-header">Enter Thumbnail URL</h2>
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="dialog-input"
                    />
                    <div className="dialog-actions">
                      <button
                        onClick={handleCloseDialog}
                        className="dialog-button dialog-button-cancel"
                      >
                        Cancel
                      </button>
                      <button
                        id="thumbnail"
                        name="thumbnail"
                        onClick={handleDialogOk}
                        className="dialog-button dialog-button-ok"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="images-container">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-2 flex flex-col gap-2">
              <div className="images-wrapper">
                {images.map((image: string, index: number) => (
                  <div key={index} className="image-item">
                    <img src={image} alt={`Uploaded ${index}`} className="image-thumbnail" />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveImage(image)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <button
                  id="images"
                  name="images"
                  onClick={handleInputClick}
                  className="upload-button"
                >
                  Upload Image
                </button>

                {isDialogOpen && (
                  <div className="dialog-overlay" role="dialog">
                    <div className="dialog-box">
                      <h2 className="dialog-header">Enter Image URL</h2>
                      <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="dialog-input"
                      />
                      <div className="dialog-actions">
                        <button
                          onClick={handleCloseDialog}
                          className="dialog-button dialog-button-cancel"
                        >
                          Cancel
                        </button>
                        <button
                          id="images"
                          name="images"
                          onClick={handleDialogOk}
                          className="dialog-button dialog-button-ok"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="developer" className="input-label">
              Developer
            </label>
            <input
              id="developer"
              name="developer"
              type="text"
              value={developer}
              onChange={handlenewGameChanges}
              placeholder="Nintendo Co."
              className="input-field"
            />
          </div>

          <div className="release-date-container">
            <label htmlFor="release_date" className="input-label">
              Release Date
            </label>
            <input
              type="date"
              name="releaseDate"
              value={releaseDate instanceof Date ? releaseDate.toISOString().split("T")[0] : ""}
              onChange={handlenewGameChanges}
              className="input-field release-date-field"
            />
          </div>

          <div className="system-requirements-container">
            <label htmlFor="system_requirements" className="input-label">
              System Requirements
            </label>
            <input
              id="system_requirements"
              name="systemRequirements"
              value={systemRequirements}
              onChange={handlenewGameChanges}
              type="text"
              placeholder="Windows 11, Intel Core i7, 16 GB RAM, RTX 3060, 30 GB storage"
              className="input-field system-requirements-field"
            />
          </div>

          <div className="price-container">
            <label htmlFor="price" className="input-label">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              value={price}
              onChange={handlenewGameChanges}
              type="number"
              placeholder="59.99"
              className="input-field price-field"
            />
          </div>
        </div>

        <div className="button-container flex justify-end gap-4">
          <button
            onClick={handleCancel}
            type="button"
            className="cancel-button text-sm font-semibold text-gray-900 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="submit"
            className="save-button rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
