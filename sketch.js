function setup() {
  var table = getTable();
  //var table = removeBadTurn(getTable())
  //printToFile(table)
  logTable(table)
  console.log(table.length)
}

function getTable() {
  var extendable = [[
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]]
  var completed = []
  
  while(extendable.length > 0) {
    var state = extendable[0]
    var possibleMoves = getPossibleStates(state)
    
    extendable = removeExtras(possibleMoves, extendable)
    
    extendable.shift()
    completed.push(state)
  }
  
  return completed
}

function isValid(state, table) {
  return !existsInTable(state, table) && !isWin(state) && isOpen(state)
}

function removeExtras(states, table) {
  for(var state of states) {
    if(isValid(state, table)) {
      table.push(state)
    }
  }
  return table
}

function existsInTable(state, table) {
  return compareRotations(state, table) || compareRotations(flip(state), table);
}

function rotate90(state) {
  a1 = state[0][0];
  a2 = state[0][1];
  a3 = state[0][2];
  b1 = state[1][0];
  b2 = state[1][1];
  b3 = state[1][2];
  c1 = state[2][0];
  c2 = state[2][1];
  c3 = state[2][2];

  return [
    [c1, b1, a1],
    [c2, b2, a2],
    [c3, b3, a3],
  ];
}

function flip(state) {
  a1 = state[0][0];
  a2 = state[0][1];
  a3 = state[0][2];
  b1 = state[1][0];
  b2 = state[1][1];
  b3 = state[1][2];
  c1 = state[2][0];
  c2 = state[2][1];
  c3 = state[2][2];

  return [
    [a3, a2, a1],
    [b3, b2, b1],
    [c3, c2, c1],
  ];
}

function compare(state, table) {
  for (var s of table) {
    if (isEqual(s, state)) {
      return true;
    }
  }
  return false;
}

function isEqual(s1, s2) {
  truths = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (s1[i][j] == s2[i][j]) {
        truths++;
      }
    }
  }
  if (truths >= 9) {
    return true;
  }
}

function compareRotations(state, table) {
  for (i = 0; i < 4; i++) {
    if (compare(state, table)) {
      return true;
    }
    state = rotate90(state);
  }
  return false;
}

function toString(state) {
  a1 = state[0][0];
  a2 = state[0][1];
  a3 = state[0][2];
  b1 = state[1][0];
  b2 = state[1][1];
  b3 = state[1][2];
  c1 = state[2][0];
  c2 = state[2][1];
  c3 = state[2][2];

  return [
    "+---+---+---+",
    "| " + a1 + " | " + a2 + " | " + a3 + " |",
    "+---+---+---+",
    "| " + b1 + " | " + b2 + " | " + b3 + " |",
    "+---+---+---+",
    "| " + c1 + " | " + c2 + " | " + c3 + " |",
    "+---+---+---+",
  ];
}

function logState(state) {
  const stateString = toString(state);
  for (var l of stateString) {
    console.log(l);
  }
}

function logTable(table) {
  for (var state of table) {
    logState(state);
    console.log()
  }
}

function isOpen(state) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (state[i][j] == " ") {
        return true;
      }
    }
  }
  return false;
}

function isWin(state) {
  a1 = state[0][0];
  a2 = state[0][1];
  a3 = state[0][2];
  b1 = state[1][0];
  b2 = state[1][1];
  b3 = state[1][2];
  c1 = state[2][0];
  c2 = state[2][1];
  c3 = state[2][2];

  if ((a1 != " " && a2 != " " && a3 != " ") && a1 == a2 && a2 == a3) {
    return true;
  } else if ((b1 != " " && b2 != " " && b3 != " ") && b1 == b2 && b2 == b3) {
    return true;
  } else if ((c1 != " " && c2 != " " && c3 != " ") && c1 == c2 && c2 == c3) {
    return true;
  } else if ((a1 != " " && b1 != " " && c1 != " ") && a1 == b1 && b1 == c1) {
    return true;
  } else if ((a2 != " " && b2 != " " && c2 != " ") && a2 == b2 && b2 == c2) {
    return true;
  } else if ((a3 != " " && b3 != " " && c3 != " ") && a3 == b3 && b3 == c3) {
    return true;
  } else if ((a1 != " " && b2 != " " && c3 != " ") && a1 == b2 && b2 == c3) {
    return true;
  } else if ((a3 != " " && b2 != " " && c1 != " ") && a3 == b2 && b2 == c1) {
    return true;
  } else {
    return false;
  }
}

function getPossibleStates(state) {
  var turn = getTurn(state)
  outputTable = []
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      if(state[i][j] == " ") {
        newState = copyState(state)
        newState[i][j] = turn
        if(!existsInTable(newState, outputTable)) {
          outputTable.push(newState)
        }
      }
    }
  }
  return outputTable
}

function getTurn(state) {
  var xCount = 0;
  var oCount = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (state[i][j] == "x") {
        xCount++;
      } else if (state[i][j] == "o") {
        oCount++;
      }
    }
  }
  if (xCount - oCount == 1) {
    return "o";
  } else if (xCount - oCount == 0) {
    return "x";
  }
}

function copyState(state) {
  var newState = [[],[],[]]
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      newState[i][j] = state[i][j]
    }
  }
  return newState
}

function printToFile(table) {
  var output = []
  for(var state of table) {
    var string = toString(state)
    string.push("")
    for(var line of string) {
      output.push(line += "\n")
    }
  }
  
  var writer = createWriter('tttstates.txt')
  writer.write(output)
  writer.close()
}

function removeBadTurn(table) {
  var output = []
  for(var state of table) {
    if(getTurn(state) == "o") {
      output.push(state)
    }
  }
  return output
}