---
layout: default
id: input-options
title: Input Options
---

When creating an element you're given the ability to create an options list in some places, these options follow a set of rules and are then rendered into actual ui which handle user input. An option is made with the following structure:

```js
{
  label: 'Label'
  type: 'OPTION_TYPE',
  id: 'OPTION_ID',
  props: {...optional},
  unlocks: ...optional
}
```

Explaining each one with more detail:

* **label** (String optional) - the option label, can be anything you want.
* **type** (String required) - the option type, you have a list of valid option types which we'll list next.
* **id** (String required) - the option id, this is used to save the option and for you to access it.
* **props** (Object optional) - some option types allow some extra props to define some of its aspects.
* **unlocks** (Object||Array optional) - some option types allow you to define further options which are unlocked when the option is of a certain value.

## Available Option Types

As said above you have a strict list of option types and some accept extra props, so here's a detailed list of every option type you can use:


Option type    | Description                                 | Native Output       
-------------- | ------------------------------------------- | -------------
Background     | Background layers                           | Object       
Border         | Border picker                               | Object       
LineStyle      | Border or line style                        | String
BoxShadow      | Box shadow layers picker                    | Array       
Buttons        | Set of options (represented with buttons)   | String
Boolean        | Checkbox                                    | Boolean
Color          | Color input                                 | Object
Select         | Combobox                                    | String
Corners        | Round corners                               | String
Custom         | Free css options                            | Array
Date           | Date picker                                 | Date
Display        | Visible or non visible option               | String
Font           | Font picker                                 | Object
Icon           | Icon picker                                 | Object
Image          | Image picker                                | String
String         | Text Input                                  | String
Link           | Link builder                                | Object
Margin         | Margin picker                               | Object
MarginPadding  | Margin and padding picker                   | Object
Number         | Number input                                | String
Optional       | Optional checkbox                           | Boolean
Padding        | Padding picker                              | Object
Percentage     | Percentage number input                     | String
Pixels         | Pixel number input                          | String
Position       | Position picker                             | Object
Html           | Rich text editor                            | String
Section        | Section options                             | none
ShadowPosition | Shadow position options                     | String
SpacingPicker  | Distances picker                            | Object
TextShadow     | Text shadow layers picker                   | Array
TitablePicker  | Entry picker for any DB model with title    | String
User           | User picker                                 | String
