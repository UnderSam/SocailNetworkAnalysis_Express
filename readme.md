# Express for SNA  

build with express.js,network.js, can calculate innter degree, outter degree, closeness, betweenness, eigenvector seperately or calculate in once.

## API doc

```javascript
root url: /api/v1
```

### Calculate : getDegree

```javascript
url: /calculate/degree
method: POST
BODY: {
    "input":
    [
        {"from":0,"to":1},
        {"from":0,"to":2},
        {"from":1,"to":2},
        {"from":2,"to":3},
        {"from":3,"to":4},
        {"from":5,"to":4},
        {"from":6,"to":4}
    ],
    "from":"from",
    "to":"to"
}
Response:
{
    "data": {
        "0": {
            "outter": 0.33,
            "inner": 0
        },
        "1": {
            "outter": 0.17,
            "inner": 0.17
        },
        "2": {
            "outter": 0.17,
            "inner": 0.33
        },
        "3": {
            "outter": 0.17,
            "inner": 0.17
        },
        "4": {
            "outter": 0,
            "inner": 0.5
        },
        "5": {
            "outter": 0.17,
            "inner": 0
        },
        "6": {
            "outter": 0.17,
            "inner": 0
        }
    }
}
```

### Calculate : getCheckness

```javascript
url: /calculate/checkness
method: POST
BODY: {
    "input":
    [
        {"from":0,"to":1},
        {"from":0,"to":2},
        {"from":1,"to":2},
        {"from":2,"to":3},
        {"from":3,"to":4},
        {"from":5,"to":4},
        {"from":6,"to":4}
    ],
    "from":"from",
    "to":"to"
}
Response:
{
    "data": {
        "0": 0.067,
        "1": 0.067,
        "2": 0.091,
        "3": 0.1,
        "4": 0.091,
        "5": 0.063,
        "6": 0.063
    }
}
```

### Calculate : getBetweeness

```javascript
url: /calculate/betweeness
method: POST
BODY: {
    "input":
    [
        {"from":0,"to":1},
        {"from":0,"to":2},
        {"from":1,"to":2},
        {"from":2,"to":3},
        {"from":3,"to":4},
        {"from":5,"to":4},
        {"from":6,"to":4}
    ],
    "from":"from",
    "to":"to"
}
Response:
{
    "data": {
        "0": 0,
        "1": 0,
        "2": 0.5333333333333333,
        "3": 0.6,
        "4": 0.6,
        "5": 0,
        "6": 0
    }
}
```

### Calculate : getEigenvector

```javascript
url: /calculate/eigenvector
method: POST
BODY: {
    "input":
    [
        {"from":0,"to":1},
        {"from":0,"to":2},
        {"from":1,"to":2},
        {"from":2,"to":3},
        {"from":3,"to":4},
        {"from":5,"to":4},
        {"from":6,"to":4}
    ],
    "from":"from",
    "to":"to"
}
Response:
{
    "data": {
        "0": 0.4602228414406159,
        "1": 0.4602228414406159,
        "2": 0.5767842032873741,
        "3": 0.37920583470351277,
        "4": 0.27766947624653543,
        "5": 0.12322949037633568,
        "6": 0.12322949037633568
    }
}
```

### Calculate : getAll

```javascript
url: /calculate/all
method: POST
BODY: {
    "input":
    [
        {"from":0,"to":1},
        {"from":0,"to":2},
        {"from":1,"to":2},
        {"from":2,"to":3},
        {"from":3,"to":4},
        {"from":5,"to":4},
        {"from":6,"to":4}
    ],
    "from":"from",
    "to":"to"
}
Response:
{
    "data": {
        "0": {
            "outter": 0.33,
            "inner": 0,
            "checkCloseness": 0.059,
            "betweenness": 0,
            "eigenvector": 0.4602228414406159
        },
        "1": {
            "outter": 0.17,
            "inner": 0.17,
            "checkCloseness": 0.059,
            "betweenness": 0,
            "eigenvector": 0.4602228414406159
        },
        "2": {
            "outter": 0.17,
            "inner": 0.33,
            "checkCloseness": 0.077,
            "betweenness": 0.5333333333333333,
            "eigenvector": 0.5767842032873741
        },
        "3": {
            "outter": 0.17,
            "inner": 0.17,
            "checkCloseness": 0.083,
            "betweenness": 0.6,
            "eigenvector": 0.37920583470351277
        },
        "4": {
            "outter": 0,
            "inner": 0.5,
            "checkCloseness": 0.077,
            "betweenness": 0.6,
            "eigenvector": 0.27766947624653543
        },
        "5": {
            "outter": 0.17,
            "inner": 0,
            "checkCloseness": 0.056,
            "betweenness": 0,
            "eigenvector": 0.12322949037633568
        },
        "6": {
            "outter": 0.17,
            "inner": 0,
            "checkCloseness": 0.056,
            "betweenness": 0,
            "eigenvector": 0.12322949037633568
        }
    }
}
```
