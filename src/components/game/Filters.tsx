import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  OutlinedInput,
  Button,
  TextField
} from "@mui/material"
import { ChangeEvent } from "react"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import "./styles/Filters.css"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

type FiltersProps = {
  sortBarValue: string
  pageSize: number
  searchKeyword: string
  filteredGenres: string[]
  filteredPlayerSupport: string[]
  genresList: string[]
  playerSupportList: string[]
  handleReset: () => void
  handleChange: (
    event:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLSelectElement | HTMLInputElement>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export default function Filters({
  sortBarValue,
  pageSize,
  searchKeyword,
  filteredGenres,
  filteredPlayerSupport,
  genresList,
  playerSupportList,
  handleReset,
  handleChange
}: FiltersProps) {
  const sortBy: { label: string; value: string }[] = [
    { label: "Name (Ascending)", value: "name_asc" },
    { label: "Name (Descending)", value: "name_desc" },
    { label: "Release Date (Ascending)", value: "releaseDate_asc" },
    { label: "Release Date (Descending)", value: "releaseDate_desc" },
    { label: "Price (Ascending)", value: "price_asc" },
    { label: "Price (Descending)", value: "price_desc" },
    { label: "Average Rating (Ascending)", value: "averageRating_asc" },
    { label: "Average Rating (Descending)", value: "averageRating_desc" }
  ]

  const gamesPerPage: { label: string; value: string }[] = [
    { label: "5 games", value: "5" },
    { label: "10 games", value: "10" },
    { label: "15 games", value: "15" },
    { label: "20 games", value: "20" }
  ]

  return (
    <div className="filters-container">
      <Box className="filters-item">
        <FormControl fullWidth>
          <InputLabel id="sortBy-label">Sort by...</InputLabel>
          <Select
            labelId="sortBy-label"
            id="sortBy"
            name="sortBy"
            value={sortBarValue}
            label="Sort by..."
            onChange={handleChange}
          >
            {sortBy.map((el) => (
              <MenuItem value={el.value} key={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className="filters-item">
        <FormControl fullWidth>
          <InputLabel id="pageSize-label">Games per page</InputLabel>
          <Select
            labelId="pageSize-label"
            id="pageSize"
            name="pageSize"
            value={pageSize.toString()}
            label="Games per page"
            onChange={handleChange}
          >
            {gamesPerPage.map((el) => (
              <MenuItem value={el.value} key={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {genresList && (
        <Box className="filters-item">
          <FormControl fullWidth>
            <InputLabel id="genreList-label">Genres</InputLabel>
            <Select
              labelId="genreList-label"
              id="genreList"
              name="genreList"
              multiple
              value={filteredGenres as unknown as string}
              onChange={handleChange}
              input={<OutlinedInput label="Genre" />}
              MenuProps={MenuProps}
            >
              {genresList.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box className="filters-item">
        <FormControl fullWidth>
          <InputLabel id="playerSupport-label">Player support</InputLabel>
          <Select
            labelId="playerSupport-label"
            id="playerSupport"
            name="playerSupport"
            multiple
            value={filteredPlayerSupport as unknown as string}
            onChange={handleChange}
            input={<OutlinedInput label="Player support" />}
            MenuProps={MenuProps}
          >
            {playerSupportList.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="searchKeyword"
        type="text"
        name="searchKeyword"
        label="Search keyword"
        className="filters-item"
        value={searchKeyword}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleReset} id="resetButton" name="resetButton">
        <p>Reset</p>
        <RotateLeftIcon />
      </Button>
    </div>
  )
}
