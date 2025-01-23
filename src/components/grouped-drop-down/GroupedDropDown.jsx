// import {
//   FormControl,
//   InputLabel,
//   ListSubheader,
//   MenuItem,
//   Select,
// } from "@material-ui/core";
// import React from "react";

// const GroupedDropDown = ({ data, selected, groupLabel, categorized , onSelectionChange }) => {
//   return (
//     <FormControl sx={{ m: 1, minWidth: 120 }}>
//       <InputLabel htmlFor="grouped-select">{groupLabel}</InputLabel>

//       {data ? (
//         categorized ? (
//           <Select 
//             defaultValue={selected!==undefined? (selected.id):("0")}
//             id="grouped-select"
//             label={groupLabel}
//             onChange={(e) => onSelectionChange(e.target.value)}
//           >
//             <ListSubheader>Selected</ListSubheader>
//             {selected!==undefined ? (<MenuItem value={selected.id}>{selected.text}</MenuItem>):(null)}
//             {/* <MenuItem value={selected.id}>{selected.text}</MenuItem> */}
//             {Object.entries(data).map((group, key) => {
//               return [
//                 <ListSubheader key={key}>{group[0]}</ListSubheader>,
//                 group[1].map((item, key) => (
//                   <MenuItem key={key} value={item.id}>
//                     {item.text}
//                   </MenuItem>
//                 )),
//               ];
//             })}
//           </Select>
//         ) : (
//           <Select value={selected.id} id="grouped-select" label={groupLabel} onChange={(e) => onSelectionChange(e.target.value)}>
//             <ListSubheader>Selected</ListSubheader>
//             <MenuItem value={selected.id}>{selected.text}</MenuItem>
//             <ListSubheader>Available</ListSubheader>
//             {data.map((object, key) => (
//               <MenuItem key={key} value={object.id}>
//                 {object.text}
//               </MenuItem>
//             ))}
//           </Select>
//         )
//       ) : (
//         <Select defaultValue={0} id="grouped-select" label={groupLabel} onChange={(e) => onSelectionChange(e.target.value)}>
//           <MenuItem value={0}>None</MenuItem>
//         </Select>
//       )}
//     </FormControl>
//   );
// };

// export default GroupedDropDown;

import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  makeStyles
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  reservedItem: {
    opacity: 0.5,
    backgroundColor: theme.palette.action.disabledBackground,
    pointerEvents: 'none',
    '&:hover': {
      backgroundColor: theme.palette.action.disabledBackground,
    }
  }
}));

const GroupedDropDown = ({ data, selected, groupLabel, categorized, onSelectionChange }) => {
  const classes = useStyles();

  const renderMenuItem = (item, key) => (
    <MenuItem 
      key={key} 
      value={item.id}
      disabled={!item.availability}
      className={!item.availability ? classes.reservedItem : ''}
    >
      {item.text}
    </MenuItem>
  );

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel htmlFor="grouped-select">{groupLabel}</InputLabel>

      {data ? (
        categorized ? (
          <Select 
            defaultValue={selected !== undefined ? (selected.id) : ("0")}
            id="grouped-select"
            label={groupLabel}
            onChange={(e) => onSelectionChange(e.target.value)}
          >
            <ListSubheader>Selected</ListSubheader>
            {selected !== undefined && (
              <MenuItem value={selected.id}>{selected.text}</MenuItem>
            )}
            {Object.entries(data).map((group, key) => [
              <ListSubheader key={`header-${key}`}>{group[0]}</ListSubheader>,
              group[1].map((item, itemKey) => renderMenuItem(item, `${key}-${itemKey}`))
            ])}
          </Select>
        ) : (
          <Select 
            value={selected.id} 
            id="grouped-select" 
            label={groupLabel} 
            onChange={(e) => onSelectionChange(e.target.value)}
          >
            <ListSubheader>Selected</ListSubheader>
            <MenuItem value={selected.id}>{selected.text}</MenuItem>
            <ListSubheader>Available</ListSubheader>
            {data.map((item, key) => renderMenuItem(item, key))}
          </Select>
        )
      ) : (
        <Select 
          defaultValue={0} 
          id="grouped-select" 
          label={groupLabel} 
          onChange={(e) => onSelectionChange(e.target.value)}
        >
          <MenuItem value={0}>None</MenuItem>
        </Select>
      )}
    </FormControl>
  );
};

export default GroupedDropDown;
