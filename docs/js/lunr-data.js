window.lunrData = {
  "index": {
    "version": "1.0.0",
    "fields": [
      {
        "name": "longname",
        "boost": 1000
      },
      {
        "name": "name",
        "boost": 500
      },
      {
        "name": "tags",
        "boost": 300
      },
      {
        "name": "kind",
        "boost": 110
      },
      {
        "name": "title",
        "boost": 100
      },
      {
        "name": "summary",
        "boost": 70
      },
      {
        "name": "description",
        "boost": 50
      },
      {
        "name": "body",
        "boost": 1
      }
    ],
    "ref": "id",
    "tokenizer": "default",
    "documentStore": {
      "store": {
        "index.html": [
          "gui",
          "haxbal",
          "haxroomi",
          "host",
          "index",
          "readm",
          "room",
          "without"
        ],
        "global.html": [
          "document",
          "global"
        ],
        "list_class.html": [
          "class",
          "document",
          "list",
          "list:class"
        ],
        "list_module.html": [
          "document",
          "list",
          "list:modul",
          "modul"
        ],
        "Haxroomie.html": [
          "anyth",
          "befor",
          "browser",
          "chrome",
          "class",
          "control",
          "creat",
          "each",
          "haxroomi",
          "headless",
          "instanc",
          "launch",
          "launchbrows",
          "manag",
          "method",
          "on",
          "requir",
          "room",
          "roomcontrol",
          "run",
          "spawn",
          "tab"
        ],
        "Haxroomie.html#launchBrowser": [
          "browser",
          "class",
          "constructor",
          "control",
          "debug",
          "function",
          "given",
          "haxroomi",
          "haxroomie#launchbrows",
          "launch",
          "launchbrows",
          "lt;async&gt",
          "on",
          "port",
          "possibl",
          "puppet",
          "remot",
          "us"
        ],
        "Haxroomie.html#closeBrowser": [
          "browser",
          "close",
          "closebrows",
          "control",
          "function",
          "haxroomie#closebrows",
          "lt;async&gt",
          "puppet"
        ],
        "Haxroomie.html#hasRoom": [
          "boolean",
          "check",
          "function",
          "given",
          "hasroom",
          "haxroomie#hasroom",
          "id",
          "room",
          "run"
        ],
        "Haxroomie.html#getRoom": [
          "function",
          "getroom",
          "given",
          "haxroomie#getroom",
          "id",
          "return",
          "roomcontrol"
        ],
        "Haxroomie.html#getRooms": [
          "array",
          "array.&lt;roomcontroller&gt",
          "avail",
          "function",
          "getroom",
          "haxroomie#getroom",
          "return",
          "roomcontrol"
        ],
        "Haxroomie.html#getFirstRoom": [
          "ad",
          "first",
          "function",
          "getfirstroom",
          "haxroomie#getfirstroom",
          "return",
          "roomcontrol"
        ],
        "Haxroomie.html#removeRoom": [
          "browser",
          "close",
          "control",
          "delet",
          "function",
          "given",
          "haxroomie#removeroom",
          "id",
          "lt;async&gt",
          "remov",
          "removeroom",
          "roomcontrol",
          "tab"
        ],
        "Haxroomie.html#addRoom": [
          "add",
          "addroom",
          "creat",
          "function",
          "given",
          "haxroomie#addroom",
          "id",
          "lt;async&gt",
          "new",
          "roomcontrol"
        ],
        "RoomController.html": [
          "browser",
          "call",
          "class",
          "commun",
          "constructor",
          "control",
          "creat",
          "directli",
          "each",
          "haxbal",
          "haxroomie#addroom",
          "headless",
          "hhm",
          "instanc",
          "interfac",
          "manag",
          "ment",
          "method",
          "new",
          "on",
          "provid",
          "roomcontrol",
          "roomobject",
          "tab"
        ],
        "RoomController.html#openRoom": [
          "browser",
          "config",
          "contain",
          "document",
          "file",
          "function",
          "global",
          "haxbal",
          "here",
          "hhm",
          "hrconfig",
          "lt;async&gt",
          "object",
          "open",
          "openroom",
          "properti",
          "room",
          "roomcontroller#openroom",
          "tab",
          "top",
          "us",
          "usabl",
          "want",
          "within"
        ],
        "RoomController.html#closeRoom": [
          "close",
          "closeroom",
          "function",
          "haxbal",
          "headless",
          "lt;async&gt",
          "room",
          "roomcontroller#closeroom"
        ],
        "RoomController.html#callRoom": [
          "browser",
          "call",
          "callroom",
          "context",
          "fn",
          "function",
          "haxbal",
          "lt;async&gt",
          "roomcontroller#callroom",
          "roomobject"
        ],
        "RoomController.html#kick": [
          "function",
          "id",
          "kick",
          "lt;async&gt",
          "player",
          "room",
          "roomcontroller#kick"
        ],
        "RoomController.html#ban": [
          "ban",
          "function",
          "id",
          "lt;async&gt",
          "player",
          "room",
          "roomcontroller#ban"
        ],
        "RoomController.html#unban": [
          "ban",
          "function",
          "given",
          "id",
          "lt;async&gt",
          "player",
          "remov",
          "roomcontroller#unban",
          "unban"
        ],
        "RoomController.html#bannedPlayers": [
          "ban",
          "bannedplay",
          "function",
          "iter",
          "iterable.&lt;object&gt",
          "lt;async&gt",
          "player",
          "return",
          "roomcontroller#bannedplay"
        ],
        "RoomController.html#getPlugins": [
          "function",
          "getplugin",
          "list",
          "lt;async&gt",
          "object",
          "plugindata",
          "promise.&lt;array.&lt;plugindata&gt;&gt",
          "return",
          "roomcontroller#getplugin"
        ],
        "RoomController.html#getPlugin": [
          "function",
          "getplugin",
          "given",
          "id",
          "lt;async&gt",
          "name",
          "plugin",
          "plugindata",
          "promise.&lt;plugindata&gt",
          "return",
          "roomcontroller#getplugin"
        ],
        "RoomController.html#enablePlugin": [
          "enabl",
          "enableplugin",
          "function",
          "given",
          "hhm",
          "id",
          "lt;async&gt",
          "name",
          "plugin",
          "roomcontroller#enableplugin"
        ],
        "RoomController.html#disablePlugin": [
          "array",
          "disabl",
          "disableplugin",
          "function",
          "given",
          "hhm",
          "id",
          "lt;async&gt",
          "name",
          "order",
          "plugin",
          "promise.&lt;boolean&gt",
          "roomcontroller#disableplugin"
        ],
        "RoomController.html#getPluginsThatDependOn": [
          "depend",
          "function",
          "get",
          "getpluginsthatdependon",
          "given",
          "list",
          "lt;async&gt",
          "name",
          "plugin",
          "promise.&lt;array.&lt;plugindata&gt;&gt",
          "roomcontroller#getpluginsthatdependon"
        ],
        "RoomController.html#eval": [
          "access",
          "browser",
          "code",
          "e.g",
          "eval",
          "evalu",
          "function",
          "given",
          "haxbal",
          "hhm.manager.room",
          "js",
          "lt;async&gt",
          "room",
          "room.eval('hhm.manager.room.getplayerlist",
          "roomcontroller#ev",
          "roomobject",
          "run",
          "tab"
        ],
        "module-haxroomie.html": [
          "const",
          "haxroomi",
          "main",
          "modul",
          "module:haxroomi",
          "obtain",
          "require('haxroomi"
        ]
      },
      "length": 28
    },
    "tokenStore": {
      "root": {
        "docs": {},
        "g": {
          "docs": {},
          "u": {
            "docs": {},
            "i": {
              "docs": {
                "index.html": {
                  "ref": "index.html",
                  "tf": 14
                }
              }
            }
          },
          "l": {
            "docs": {},
            "o": {
              "docs": {},
              "b": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "global.html": {
                        "ref": "global.html",
                        "tf": 2045
                      },
                      "RoomController.html#openRoom": {
                        "ref": "RoomController.html#openRoom",
                        "tf": 1.8518518518518516
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {
                    "Haxroomie.html#launchBrowser": {
                      "ref": "Haxroomie.html#launchBrowser",
                      "tf": 3.125
                    },
                    "Haxroomie.html#hasRoom": {
                      "ref": "Haxroomie.html#hasRoom",
                      "tf": 10
                    },
                    "Haxroomie.html#getRoom": {
                      "ref": "Haxroomie.html#getRoom",
                      "tf": 12.5
                    },
                    "Haxroomie.html#removeRoom": {
                      "ref": "Haxroomie.html#removeRoom",
                      "tf": 4.545454545454546
                    },
                    "Haxroomie.html#addRoom": {
                      "ref": "Haxroomie.html#addRoom",
                      "tf": 8.333333333333332
                    },
                    "RoomController.html#unban": {
                      "ref": "RoomController.html#unban",
                      "tf": 10
                    },
                    "RoomController.html#getPlugin": {
                      "ref": "RoomController.html#getPlugin",
                      "tf": 10
                    },
                    "RoomController.html#enablePlugin": {
                      "ref": "RoomController.html#enablePlugin",
                      "tf": 10
                    },
                    "RoomController.html#disablePlugin": {
                      "ref": "RoomController.html#disablePlugin",
                      "tf": 9.090909090909092
                    },
                    "RoomController.html#getPluginsThatDependOn": {
                      "ref": "RoomController.html#getPluginsThatDependOn",
                      "tf": 8.333333333333332
                    },
                    "RoomController.html#eval": {
                      "ref": "RoomController.html#eval",
                      "tf": 3.8461538461538463
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "t": {
              "docs": {
                "RoomController.html#getPluginsThatDependOn": {
                  "ref": "RoomController.html#getPluginsThatDependOn",
                  "tf": 8.333333333333332
                }
              },
              "r": {
                "docs": {},
                "o": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "m": {
                      "docs": {
                        "Haxroomie.html#getRoom": {
                          "ref": "Haxroomie.html#getRoom",
                          "tf": 683.3333333333334
                        },
                        "Haxroomie.html#getRooms": {
                          "ref": "Haxroomie.html#getRooms",
                          "tf": 700
                        }
                      }
                    }
                  }
                }
              },
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "m": {
                                "docs": {
                                  "Haxroomie.html#getFirstRoom": {
                                    "ref": "Haxroomie.html#getFirstRoom",
                                    "tf": 700
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "l": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "g": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "n": {
                          "docs": {
                            "RoomController.html#getPlugins": {
                              "ref": "RoomController.html#getPlugins",
                              "tf": 683.3333333333334
                            },
                            "RoomController.html#getPlugin": {
                              "ref": "RoomController.html#getPlugin",
                              "tf": 675
                            }
                          },
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "h": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "d": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "n": {
                                              "docs": {},
                                              "d": {
                                                "docs": {},
                                                "o": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {
                                                      "RoomController.html#getPluginsThatDependOn": {
                                                        "ref": "RoomController.html#getPluginsThatDependOn",
                                                        "tf": 675
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "h": {
          "docs": {},
          "a": {
            "docs": {},
            "x": {
              "docs": {},
              "b": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "index.html": {
                        "ref": "index.html",
                        "tf": 14
                      },
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 3.7037037037037033
                      },
                      "RoomController.html#openRoom": {
                        "ref": "RoomController.html#openRoom",
                        "tf": 1.8518518518518516
                      },
                      "RoomController.html#closeRoom": {
                        "ref": "RoomController.html#closeRoom",
                        "tf": 12.5
                      },
                      "RoomController.html#callRoom": {
                        "ref": "RoomController.html#callRoom",
                        "tf": 8.333333333333332
                      },
                      "RoomController.html#eval": {
                        "ref": "RoomController.html#eval",
                        "tf": 3.8461538461538463
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "o": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "index.html": {
                            "ref": "index.html",
                            "tf": 600
                          },
                          "Haxroomie.html": {
                            "ref": "Haxroomie.html",
                            "tf": 1902
                          },
                          "Haxroomie.html#launchBrowser": {
                            "ref": "Haxroomie.html#launchBrowser",
                            "tf": 3.125
                          },
                          "module-haxroomie.html": {
                            "ref": "module-haxroomie.html",
                            "tf": 614.2857142857143
                          }
                        },
                        "e": {
                          "docs": {},
                          "#": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "h": {
                                        "docs": {},
                                        "b": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "w": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {
                                                    "Haxroomie.html#launchBrowser": {
                                                      "ref": "Haxroomie.html#launchBrowser",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "c": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "b": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "w": {
                                              "docs": {},
                                              "s": {
                                                "docs": {
                                                  "Haxroomie.html#closeBrowser": {
                                                    "ref": "Haxroomie.html#closeBrowser",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "h": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "m": {
                                          "docs": {
                                            "Haxroomie.html#hasRoom": {
                                              "ref": "Haxroomie.html#hasRoom",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "g": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "m": {
                                          "docs": {
                                            "Haxroomie.html#getRoom": {
                                              "ref": "Haxroomie.html#getRoom",
                                              "tf": 1150
                                            },
                                            "Haxroomie.html#getRooms": {
                                              "ref": "Haxroomie.html#getRooms",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "f": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "s": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "o": {
                                                  "docs": {},
                                                  "m": {
                                                    "docs": {
                                                      "Haxroomie.html#getFirstRoom": {
                                                        "ref": "Haxroomie.html#getFirstRoom",
                                                        "tf": 1150
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "r": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "v": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "m": {
                                                "docs": {
                                                  "Haxroomie.html#removeRoom": {
                                                    "ref": "Haxroomie.html#removeRoom",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "a": {
                              "docs": {},
                              "d": {
                                "docs": {},
                                "d": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "m": {
                                          "docs": {
                                            "Haxroomie.html#addRoom": {
                                              "ref": "Haxroomie.html#addRoom",
                                              "tf": 1150
                                            },
                                            "RoomController.html": {
                                              "ref": "RoomController.html",
                                              "tf": 1.8518518518518516
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "r": {
                "docs": {},
                "o": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "m": {
                      "docs": {
                        "Haxroomie.html#hasRoom": {
                          "ref": "Haxroomie.html#hasRoom",
                          "tf": 683.3333333333334
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {
                  "index.html": {
                    "ref": "index.html",
                    "tf": 14
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "a": {
              "docs": {},
              "d": {
                "docs": {},
                "l": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "s": {
                        "docs": {
                          "Haxroomie.html": {
                            "ref": "Haxroomie.html",
                            "tf": 2
                          },
                          "RoomController.html": {
                            "ref": "RoomController.html",
                            "tf": 3.7037037037037033
                          },
                          "RoomController.html#closeRoom": {
                            "ref": "RoomController.html#closeRoom",
                            "tf": 12.5
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "e": {
                "docs": {
                  "RoomController.html#openRoom": {
                    "ref": "RoomController.html#openRoom",
                    "tf": 1.8518518518518516
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "m": {
              "docs": {
                "RoomController.html": {
                  "ref": "RoomController.html",
                  "tf": 1.8518518518518516
                },
                "RoomController.html#openRoom": {
                  "ref": "RoomController.html#openRoom",
                  "tf": 3.7037037037037033
                },
                "RoomController.html#enablePlugin": {
                  "ref": "RoomController.html#enablePlugin",
                  "tf": 10
                },
                "RoomController.html#disablePlugin": {
                  "ref": "RoomController.html#disablePlugin",
                  "tf": 4.545454545454546
                }
              },
              ".": {
                "docs": {},
                "m": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "g": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              ".": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "m": {
                                        "docs": {
                                          "RoomController.html#eval": {
                                            "ref": "RoomController.html#eval",
                                            "tf": 3.8461538461538463
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "c": {
              "docs": {},
              "o": {
                "docs": {},
                "n": {
                  "docs": {},
                  "f": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "g": {
                        "docs": {
                          "RoomController.html#openRoom": {
                            "ref": "RoomController.html#openRoom",
                            "tf": 1.8518518518518516
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "i": {
          "docs": {},
          "n": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "x": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 1300
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "a": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "c": {
                      "docs": {
                        "Haxroomie.html": {
                          "ref": "Haxroomie.html",
                          "tf": 2
                        },
                        "RoomController.html": {
                          "ref": "RoomController.html",
                          "tf": 1.8518518518518516
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "f": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "c": {
                        "docs": {
                          "RoomController.html": {
                            "ref": "RoomController.html",
                            "tf": 1.8518518518518516
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "d": {
            "docs": {
              "Haxroomie.html#hasRoom": {
                "ref": "Haxroomie.html#hasRoom",
                "tf": 43.33333333333333
              },
              "Haxroomie.html#getRoom": {
                "ref": "Haxroomie.html#getRoom",
                "tf": 45.83333333333333
              },
              "Haxroomie.html#removeRoom": {
                "ref": "Haxroomie.html#removeRoom",
                "tf": 37.878787878787875
              },
              "Haxroomie.html#addRoom": {
                "ref": "Haxroomie.html#addRoom",
                "tf": 33.33333333333333
              },
              "RoomController.html#kick": {
                "ref": "RoomController.html#kick",
                "tf": 33.33333333333333
              },
              "RoomController.html#ban": {
                "ref": "RoomController.html#ban",
                "tf": 33.33333333333333
              },
              "RoomController.html#unban": {
                "ref": "RoomController.html#unban",
                "tf": 43.33333333333333
              },
              "RoomController.html#getPlugin": {
                "ref": "RoomController.html#getPlugin",
                "tf": 10
              },
              "RoomController.html#enablePlugin": {
                "ref": "RoomController.html#enablePlugin",
                "tf": 10
              },
              "RoomController.html#disablePlugin": {
                "ref": "RoomController.html#disablePlugin",
                "tf": 4.545454545454546
              }
            }
          },
          "t": {
            "docs": {},
            "e": {
              "docs": {},
              "r": {
                "docs": {
                  "RoomController.html#bannedPlayers": {
                    "ref": "RoomController.html#bannedPlayers",
                    "tf": 12.5
                  }
                },
                "a": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        ".": {
                          "docs": {},
                          "&": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                ";": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "b": {
                                      "docs": {},
                                      "j": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "c": {
                                            "docs": {},
                                            "t": {
                                              "docs": {},
                                              "&": {
                                                "docs": {},
                                                "g": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "RoomController.html#bannedPlayers": {
                                                        "ref": "RoomController.html#bannedPlayers",
                                                        "tf": 33.33333333333333
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "r": {
          "docs": {},
          "e": {
            "docs": {},
            "a": {
              "docs": {},
              "d": {
                "docs": {},
                "m": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 110
                    }
                  }
                }
              }
            },
            "q": {
              "docs": {},
              "u": {
                "docs": {},
                "i": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Haxroomie.html": {
                        "ref": "Haxroomie.html",
                        "tf": 2
                      }
                    },
                    "e": {
                      "docs": {},
                      "(": {
                        "docs": {},
                        "'": {
                          "docs": {},
                          "h": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "x": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "m": {
                                        "docs": {},
                                        "i": {
                                          "docs": {
                                            "module-haxroomie.html": {
                                              "ref": "module-haxroomie.html",
                                              "tf": 7.142857142857142
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "o": {
                "docs": {},
                "t": {
                  "docs": {
                    "Haxroomie.html#launchBrowser": {
                      "ref": "Haxroomie.html#launchBrowser",
                      "tf": 3.125
                    }
                  }
                },
                "v": {
                  "docs": {
                    "Haxroomie.html#removeRoom": {
                      "ref": "Haxroomie.html#removeRoom",
                      "tf": 9.090909090909092
                    },
                    "RoomController.html#unban": {
                      "ref": "RoomController.html#unban",
                      "tf": 10
                    }
                  },
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "m": {
                            "docs": {
                              "Haxroomie.html#removeRoom": {
                                "ref": "Haxroomie.html#removeRoom",
                                "tf": 683.3333333333334
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Haxroomie.html#getRoom": {
                        "ref": "Haxroomie.html#getRoom",
                        "tf": 12.5
                      },
                      "Haxroomie.html#getRooms": {
                        "ref": "Haxroomie.html#getRooms",
                        "tf": 12.5
                      },
                      "Haxroomie.html#getFirstRoom": {
                        "ref": "Haxroomie.html#getFirstRoom",
                        "tf": 12.5
                      },
                      "RoomController.html#bannedPlayers": {
                        "ref": "RoomController.html#bannedPlayers",
                        "tf": 12.5
                      },
                      "RoomController.html#getPlugins": {
                        "ref": "RoomController.html#getPlugins",
                        "tf": 12.5
                      },
                      "RoomController.html#getPlugin": {
                        "ref": "RoomController.html#getPlugin",
                        "tf": 10
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "m": {
                "docs": {
                  "index.html": {
                    "ref": "index.html",
                    "tf": 14
                  },
                  "Haxroomie.html": {
                    "ref": "Haxroomie.html",
                    "tf": 2
                  },
                  "Haxroomie.html#hasRoom": {
                    "ref": "Haxroomie.html#hasRoom",
                    "tf": 10
                  },
                  "RoomController.html#openRoom": {
                    "ref": "RoomController.html#openRoom",
                    "tf": 1.8518518518518516
                  },
                  "RoomController.html#closeRoom": {
                    "ref": "RoomController.html#closeRoom",
                    "tf": 12.5
                  },
                  "RoomController.html#kick": {
                    "ref": "RoomController.html#kick",
                    "tf": 16.666666666666664
                  },
                  "RoomController.html#ban": {
                    "ref": "RoomController.html#ban",
                    "tf": 16.666666666666664
                  },
                  "RoomController.html#eval": {
                    "ref": "RoomController.html#eval",
                    "tf": 3.8461538461538463
                  }
                },
                "c": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "l": {
                              "docs": {
                                "Haxroomie.html": {
                                  "ref": "Haxroomie.html",
                                  "tf": 4
                                },
                                "Haxroomie.html#getRoom": {
                                  "ref": "Haxroomie.html#getRoom",
                                  "tf": 45.83333333333333
                                },
                                "Haxroomie.html#getRooms": {
                                  "ref": "Haxroomie.html#getRooms",
                                  "tf": 12.5
                                },
                                "Haxroomie.html#getFirstRoom": {
                                  "ref": "Haxroomie.html#getFirstRoom",
                                  "tf": 62.5
                                },
                                "Haxroomie.html#removeRoom": {
                                  "ref": "Haxroomie.html#removeRoom",
                                  "tf": 9.090909090909092
                                },
                                "Haxroomie.html#addRoom": {
                                  "ref": "Haxroomie.html#addRoom",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html": {
                                  "ref": "RoomController.html",
                                  "tf": 1905.5555555555557
                                }
                              },
                              "l": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "#": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "n": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "o": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "m": {
                                                      "docs": {
                                                        "RoomController.html#openRoom": {
                                                          "ref": "RoomController.html#openRoom",
                                                          "tf": 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "c": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "m": {
                                                        "docs": {
                                                          "RoomController.html#closeRoom": {
                                                            "ref": "RoomController.html#closeRoom",
                                                            "tf": 1150
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "a": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "o": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "m": {
                                                      "docs": {
                                                        "RoomController.html#callRoom": {
                                                          "ref": "RoomController.html#callRoom",
                                                          "tf": 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "k": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "c": {
                                            "docs": {},
                                            "k": {
                                              "docs": {
                                                "RoomController.html#kick": {
                                                  "ref": "RoomController.html#kick",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "b": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "n": {
                                            "docs": {
                                              "RoomController.html#ban": {
                                                "ref": "RoomController.html#ban",
                                                "tf": 1150
                                              }
                                            },
                                            "n": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "d": {
                                                  "docs": {},
                                                  "p": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "y": {
                                                          "docs": {
                                                            "RoomController.html#bannedPlayers": {
                                                              "ref": "RoomController.html#bannedPlayers",
                                                              "tf": 1150
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "u": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "b": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "n": {
                                                "docs": {
                                                  "RoomController.html#unban": {
                                                    "ref": "RoomController.html#unban",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "g": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "p": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "u": {
                                                  "docs": {},
                                                  "g": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "n": {
                                                        "docs": {
                                                          "RoomController.html#getPlugins": {
                                                            "ref": "RoomController.html#getPlugins",
                                                            "tf": 1150
                                                          },
                                                          "RoomController.html#getPlugin": {
                                                            "ref": "RoomController.html#getPlugin",
                                                            "tf": 1150
                                                          }
                                                        },
                                                        "s": {
                                                          "docs": {},
                                                          "t": {
                                                            "docs": {},
                                                            "h": {
                                                              "docs": {},
                                                              "a": {
                                                                "docs": {},
                                                                "t": {
                                                                  "docs": {},
                                                                  "d": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "p": {
                                                                        "docs": {},
                                                                        "e": {
                                                                          "docs": {},
                                                                          "n": {
                                                                            "docs": {},
                                                                            "d": {
                                                                              "docs": {},
                                                                              "o": {
                                                                                "docs": {},
                                                                                "n": {
                                                                                  "docs": {
                                                                                    "RoomController.html#getPluginsThatDependOn": {
                                                                                      "ref": "RoomController.html#getPluginsThatDependOn",
                                                                                      "tf": 1150
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "e": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "b": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "p": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "g": {
                                                          "docs": {},
                                                          "i": {
                                                            "docs": {},
                                                            "n": {
                                                              "docs": {
                                                                "RoomController.html#enablePlugin": {
                                                                  "ref": "RoomController.html#enablePlugin",
                                                                  "tf": 1150
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "v": {
                                          "docs": {
                                            "RoomController.html#eval": {
                                              "ref": "RoomController.html#eval",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      },
                                      "d": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "b": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "p": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {},
                                                        "u": {
                                                          "docs": {},
                                                          "g": {
                                                            "docs": {},
                                                            "i": {
                                                              "docs": {},
                                                              "n": {
                                                                "docs": {
                                                                  "RoomController.html#disablePlugin": {
                                                                    "ref": "RoomController.html#disablePlugin",
                                                                    "tf": 1150
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "j": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "RoomController.html": {
                                "ref": "RoomController.html",
                                "tf": 1.8518518518518516
                              },
                              "RoomController.html#callRoom": {
                                "ref": "RoomController.html#callRoom",
                                "tf": 8.333333333333332
                              },
                              "RoomController.html#eval": {
                                "ref": "RoomController.html#eval",
                                "tf": 3.8461538461538463
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                ".": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "v": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "(": {
                            "docs": {},
                            "'": {
                              "docs": {},
                              "h": {
                                "docs": {},
                                "h": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    ".": {
                                      "docs": {},
                                      "m": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    ".": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "o": {
                                                          "docs": {},
                                                          "o": {
                                                            "docs": {},
                                                            "m": {
                                                              "docs": {},
                                                              ".": {
                                                                "docs": {},
                                                                "g": {
                                                                  "docs": {},
                                                                  "e": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {},
                                                                      "p": {
                                                                        "docs": {},
                                                                        "l": {
                                                                          "docs": {},
                                                                          "a": {
                                                                            "docs": {},
                                                                            "y": {
                                                                              "docs": {},
                                                                              "e": {
                                                                                "docs": {},
                                                                                "r": {
                                                                                  "docs": {},
                                                                                  "l": {
                                                                                    "docs": {},
                                                                                    "i": {
                                                                                      "docs": {},
                                                                                      "s": {
                                                                                        "docs": {},
                                                                                        "t": {
                                                                                          "docs": {
                                                                                            "RoomController.html#eval": {
                                                                                              "ref": "RoomController.html#eval",
                                                                                              "tf": 3.8461538461538463
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "n": {
              "docs": {
                "Haxroomie.html": {
                  "ref": "Haxroomie.html",
                  "tf": 2
                },
                "Haxroomie.html#hasRoom": {
                  "ref": "Haxroomie.html#hasRoom",
                  "tf": 10
                },
                "RoomController.html#eval": {
                  "ref": "RoomController.html#eval",
                  "tf": 3.8461538461538463
                }
              }
            }
          }
        },
        "w": {
          "docs": {},
          "i": {
            "docs": {},
            "t": {
              "docs": {},
              "h": {
                "docs": {},
                "o": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "index.html": {
                          "ref": "index.html",
                          "tf": 14
                        }
                      }
                    }
                  }
                },
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "RoomController.html#openRoom": {
                        "ref": "RoomController.html#openRoom",
                        "tf": 1.8518518518518516
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "n": {
              "docs": {},
              "t": {
                "docs": {
                  "RoomController.html#openRoom": {
                    "ref": "RoomController.html#openRoom",
                    "tf": 1.8518518518518516
                  }
                }
              }
            }
          }
        },
        "d": {
          "docs": {},
          "o": {
            "docs": {},
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "global.html": {
                            "ref": "global.html",
                            "tf": 35
                          },
                          "list_class.html": {
                            "ref": "list_class.html",
                            "tf": 35
                          },
                          "list_module.html": {
                            "ref": "list_module.html",
                            "tf": 35
                          },
                          "RoomController.html#openRoom": {
                            "ref": "RoomController.html#openRoom",
                            "tf": 1.8518518518518516
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "b": {
              "docs": {},
              "u": {
                "docs": {},
                "g": {
                  "docs": {
                    "Haxroomie.html#launchBrowser": {
                      "ref": "Haxroomie.html#launchBrowser",
                      "tf": 3.125
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "e": {
                "docs": {},
                "t": {
                  "docs": {
                    "Haxroomie.html#removeRoom": {
                      "ref": "Haxroomie.html#removeRoom",
                      "tf": 4.545454545454546
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "RoomController.html#getPluginsThatDependOn": {
                        "ref": "RoomController.html#getPluginsThatDependOn",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "r": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "RoomController.html": {
                            "ref": "RoomController.html",
                            "tf": 1.8518518518518516
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "a": {
                "docs": {},
                "b": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "RoomController.html#disablePlugin": {
                        "ref": "RoomController.html#disablePlugin",
                        "tf": 9.090909090909092
                      }
                    },
                    "e": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "g": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "n": {
                                  "docs": {
                                    "RoomController.html#disablePlugin": {
                                      "ref": "RoomController.html#disablePlugin",
                                      "tf": 675
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "c": {
          "docs": {},
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "s": {
                "docs": {},
                "s": {
                  "docs": {
                    "list_class.html": {
                      "ref": "list_class.html",
                      "tf": 635
                    },
                    "Haxroomie.html": {
                      "ref": "Haxroomie.html",
                      "tf": 112
                    },
                    "Haxroomie.html#launchBrowser": {
                      "ref": "Haxroomie.html#launchBrowser",
                      "tf": 3.125
                    },
                    "RoomController.html": {
                      "ref": "RoomController.html",
                      "tf": 110
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "s": {
                "docs": {},
                "e": {
                  "docs": {
                    "Haxroomie.html#closeBrowser": {
                      "ref": "Haxroomie.html#closeBrowser",
                      "tf": 12.5
                    },
                    "Haxroomie.html#removeRoom": {
                      "ref": "Haxroomie.html#removeRoom",
                      "tf": 4.545454545454546
                    },
                    "RoomController.html#closeRoom": {
                      "ref": "RoomController.html#closeRoom",
                      "tf": 12.5
                    }
                  },
                  "b": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "w": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "Haxroomie.html#closeBrowser": {
                                "ref": "Haxroomie.html#closeBrowser",
                                "tf": 700
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "r": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "m": {
                          "docs": {
                            "RoomController.html#closeRoom": {
                              "ref": "RoomController.html#closeRoom",
                              "tf": 700
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {
                      "Haxroomie.html": {
                        "ref": "Haxroomie.html",
                        "tf": 2
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "c": {
                "docs": {},
                "k": {
                  "docs": {
                    "Haxroomie.html#hasRoom": {
                      "ref": "Haxroomie.html#hasRoom",
                      "tf": 10
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "n": {
              "docs": {},
              "t": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "Haxroomie.html": {
                          "ref": "Haxroomie.html",
                          "tf": 2
                        },
                        "Haxroomie.html#launchBrowser": {
                          "ref": "Haxroomie.html#launchBrowser",
                          "tf": 3.125
                        },
                        "Haxroomie.html#closeBrowser": {
                          "ref": "Haxroomie.html#closeBrowser",
                          "tf": 12.5
                        },
                        "Haxroomie.html#removeRoom": {
                          "ref": "Haxroomie.html#removeRoom",
                          "tf": 4.545454545454546
                        },
                        "RoomController.html": {
                          "ref": "RoomController.html",
                          "tf": 1.8518518518518516
                        }
                      }
                    }
                  }
                },
                "a": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "RoomController.html#openRoom": {
                          "ref": "RoomController.html#openRoom",
                          "tf": 1.8518518518518516
                        }
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "x": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "RoomController.html#callRoom": {
                          "ref": "RoomController.html#callRoom",
                          "tf": 8.333333333333332
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "t": {
                  "docs": {
                    "module-haxroomie.html": {
                      "ref": "module-haxroomie.html",
                      "tf": 7.142857142857142
                    }
                  },
                  "r": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "r": {
                              "docs": {
                                "Haxroomie.html#launchBrowser": {
                                  "ref": "Haxroomie.html#launchBrowser",
                                  "tf": 3.125
                                },
                                "RoomController.html": {
                                  "ref": "RoomController.html",
                                  "tf": 1.8518518518518516
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "g": {
                    "docs": {
                      "RoomController.html#openRoom": {
                        "ref": "RoomController.html#openRoom",
                        "tf": 32.407407407407405
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "m": {
                "docs": {},
                "u": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 1.8518518518518516
                      }
                    }
                  }
                }
              }
            },
            "d": {
              "docs": {},
              "e": {
                "docs": {
                  "RoomController.html#eval": {
                    "ref": "RoomController.html#eval",
                    "tf": 3.8461538461538463
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "e": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "Haxroomie.html": {
                      "ref": "Haxroomie.html",
                      "tf": 2
                    },
                    "Haxroomie.html#addRoom": {
                      "ref": "Haxroomie.html#addRoom",
                      "tf": 8.333333333333332
                    },
                    "RoomController.html": {
                      "ref": "RoomController.html",
                      "tf": 1.8518518518518516
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "RoomController.html": {
                    "ref": "RoomController.html",
                    "tf": 1.8518518518518516
                  },
                  "RoomController.html#callRoom": {
                    "ref": "RoomController.html#callRoom",
                    "tf": 8.333333333333332
                  }
                },
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "m": {
                        "docs": {
                          "RoomController.html#callRoom": {
                            "ref": "RoomController.html#callRoom",
                            "tf": 683.3333333333334
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "l": {
          "docs": {},
          "i": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {
                  "list_class.html": {
                    "ref": "list_class.html",
                    "tf": 110
                  },
                  "list_module.html": {
                    "ref": "list_module.html",
                    "tf": 110
                  },
                  "RoomController.html#getPlugins": {
                    "ref": "RoomController.html#getPlugins",
                    "tf": 12.5
                  },
                  "RoomController.html#getPluginsThatDependOn": {
                    "ref": "RoomController.html#getPluginsThatDependOn",
                    "tf": 8.333333333333332
                  }
                },
                ":": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "list_class.html": {
                                "ref": "list_class.html",
                                "tf": 1300
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "m": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "l": {
                            "docs": {
                              "list_module.html": {
                                "ref": "list_module.html",
                                "tf": 1300
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "u": {
              "docs": {},
              "n": {
                "docs": {},
                "c": {
                  "docs": {},
                  "h": {
                    "docs": {
                      "Haxroomie.html": {
                        "ref": "Haxroomie.html",
                        "tf": 2
                      },
                      "Haxroomie.html#launchBrowser": {
                        "ref": "Haxroomie.html#launchBrowser",
                        "tf": 6.25
                      }
                    },
                    "b": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "w": {
                            "docs": {},
                            "s": {
                              "docs": {
                                "Haxroomie.html": {
                                  "ref": "Haxroomie.html",
                                  "tf": 2
                                },
                                "Haxroomie.html#launchBrowser": {
                                  "ref": "Haxroomie.html#launchBrowser",
                                  "tf": 700
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            ";": {
              "docs": {},
              "a": {
                "docs": {},
                "s": {
                  "docs": {},
                  "y": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "Haxroomie.html#launchBrowser": {
                                  "ref": "Haxroomie.html#launchBrowser",
                                  "tf": 50
                                },
                                "Haxroomie.html#closeBrowser": {
                                  "ref": "Haxroomie.html#closeBrowser",
                                  "tf": 50
                                },
                                "Haxroomie.html#removeRoom": {
                                  "ref": "Haxroomie.html#removeRoom",
                                  "tf": 33.33333333333333
                                },
                                "Haxroomie.html#addRoom": {
                                  "ref": "Haxroomie.html#addRoom",
                                  "tf": 25
                                },
                                "RoomController.html#openRoom": {
                                  "ref": "RoomController.html#openRoom",
                                  "tf": 25
                                },
                                "RoomController.html#closeRoom": {
                                  "ref": "RoomController.html#closeRoom",
                                  "tf": 50
                                },
                                "RoomController.html#callRoom": {
                                  "ref": "RoomController.html#callRoom",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html#kick": {
                                  "ref": "RoomController.html#kick",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html#ban": {
                                  "ref": "RoomController.html#ban",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html#unban": {
                                  "ref": "RoomController.html#unban",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html#bannedPlayers": {
                                  "ref": "RoomController.html#bannedPlayers",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html#getPlugins": {
                                  "ref": "RoomController.html#getPlugins",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html#getPlugin": {
                                  "ref": "RoomController.html#getPlugin",
                                  "tf": 25
                                },
                                "RoomController.html#enablePlugin": {
                                  "ref": "RoomController.html#enablePlugin",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html#disablePlugin": {
                                  "ref": "RoomController.html#disablePlugin",
                                  "tf": 25
                                },
                                "RoomController.html#getPluginsThatDependOn": {
                                  "ref": "RoomController.html#getPluginsThatDependOn",
                                  "tf": 25
                                },
                                "RoomController.html#eval": {
                                  "ref": "RoomController.html#eval",
                                  "tf": 33.33333333333333
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "m": {
          "docs": {},
          "o": {
            "docs": {},
            "d": {
              "docs": {},
              "u": {
                "docs": {},
                "l": {
                  "docs": {
                    "list_module.html": {
                      "ref": "list_module.html",
                      "tf": 635
                    },
                    "module-haxroomie.html": {
                      "ref": "module-haxroomie.html",
                      "tf": 117.14285714285714
                    }
                  },
                  "e": {
                    "docs": {},
                    ":": {
                      "docs": {},
                      "h": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "x": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "i": {
                                      "docs": {
                                        "module-haxroomie.html": {
                                          "ref": "module-haxroomie.html",
                                          "tf": 1300
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "n": {
              "docs": {},
              "a": {
                "docs": {},
                "g": {
                  "docs": {
                    "Haxroomie.html": {
                      "ref": "Haxroomie.html",
                      "tf": 2
                    },
                    "RoomController.html": {
                      "ref": "RoomController.html",
                      "tf": 1.8518518518518516
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "n": {
                "docs": {
                  "module-haxroomie.html": {
                    "ref": "module-haxroomie.html",
                    "tf": 7.142857142857142
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "t": {
              "docs": {},
              "h": {
                "docs": {},
                "o": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "Haxroomie.html": {
                        "ref": "Haxroomie.html",
                        "tf": 2
                      },
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 1.8518518518518516
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "t": {
                "docs": {
                  "RoomController.html": {
                    "ref": "RoomController.html",
                    "tf": 1.8518518518518516
                  }
                }
              }
            }
          }
        },
        "a": {
          "docs": {},
          "n": {
            "docs": {},
            "y": {
              "docs": {},
              "t": {
                "docs": {},
                "h": {
                  "docs": {
                    "Haxroomie.html": {
                      "ref": "Haxroomie.html",
                      "tf": 2
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "r": {
              "docs": {},
              "a": {
                "docs": {},
                "y": {
                  "docs": {
                    "Haxroomie.html#getRooms": {
                      "ref": "Haxroomie.html#getRooms",
                      "tf": 12.5
                    },
                    "RoomController.html#disablePlugin": {
                      "ref": "RoomController.html#disablePlugin",
                      "tf": 4.545454545454546
                    }
                  },
                  ".": {
                    "docs": {},
                    "&": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          ";": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "l": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "&": {
                                                          "docs": {},
                                                          "g": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {
                                                                "Haxroomie.html#getRooms": {
                                                                  "ref": "Haxroomie.html#getRooms",
                                                                  "tf": 50
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "a": {
              "docs": {},
              "i": {
                "docs": {},
                "l": {
                  "docs": {
                    "Haxroomie.html#getRooms": {
                      "ref": "Haxroomie.html#getRooms",
                      "tf": 12.5
                    }
                  }
                }
              }
            }
          },
          "d": {
            "docs": {
              "Haxroomie.html#getFirstRoom": {
                "ref": "Haxroomie.html#getFirstRoom",
                "tf": 12.5
              }
            },
            "d": {
              "docs": {
                "Haxroomie.html#addRoom": {
                  "ref": "Haxroomie.html#addRoom",
                  "tf": 8.333333333333332
                }
              },
              "r": {
                "docs": {},
                "o": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "m": {
                      "docs": {
                        "Haxroomie.html#addRoom": {
                          "ref": "Haxroomie.html#addRoom",
                          "tf": 675
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "c": {
            "docs": {},
            "c": {
              "docs": {},
              "e": {
                "docs": {},
                "s": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "RoomController.html#eval": {
                        "ref": "RoomController.html#eval",
                        "tf": 3.8461538461538463
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "b": {
          "docs": {},
          "e": {
            "docs": {},
            "f": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {
                    "Haxroomie.html": {
                      "ref": "Haxroomie.html",
                      "tf": 2
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "w": {
                "docs": {},
                "s": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "Haxroomie.html": {
                          "ref": "Haxroomie.html",
                          "tf": 6
                        },
                        "Haxroomie.html#launchBrowser": {
                          "ref": "Haxroomie.html#launchBrowser",
                          "tf": 6.25
                        },
                        "Haxroomie.html#closeBrowser": {
                          "ref": "Haxroomie.html#closeBrowser",
                          "tf": 12.5
                        },
                        "Haxroomie.html#removeRoom": {
                          "ref": "Haxroomie.html#removeRoom",
                          "tf": 4.545454545454546
                        },
                        "RoomController.html": {
                          "ref": "RoomController.html",
                          "tf": 1.8518518518518516
                        },
                        "RoomController.html#openRoom": {
                          "ref": "RoomController.html#openRoom",
                          "tf": 1.8518518518518516
                        },
                        "RoomController.html#callRoom": {
                          "ref": "RoomController.html#callRoom",
                          "tf": 8.333333333333332
                        },
                        "RoomController.html#eval": {
                          "ref": "RoomController.html#eval",
                          "tf": 3.8461538461538463
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "l": {
                "docs": {},
                "e": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "Haxroomie.html#hasRoom": {
                          "ref": "Haxroomie.html#hasRoom",
                          "tf": 33.33333333333333
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "n": {
              "docs": {
                "RoomController.html#ban": {
                  "ref": "RoomController.html#ban",
                  "tf": 700
                },
                "RoomController.html#unban": {
                  "ref": "RoomController.html#unban",
                  "tf": 10
                },
                "RoomController.html#bannedPlayers": {
                  "ref": "RoomController.html#bannedPlayers",
                  "tf": 12.5
                }
              },
              "n": {
                "docs": {},
                "e": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "y": {
                            "docs": {
                              "RoomController.html#bannedPlayers": {
                                "ref": "RoomController.html#bannedPlayers",
                                "tf": 683.3333333333334
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "e": {
          "docs": {},
          "a": {
            "docs": {},
            "c": {
              "docs": {},
              "h": {
                "docs": {
                  "Haxroomie.html": {
                    "ref": "Haxroomie.html",
                    "tf": 2
                  },
                  "RoomController.html": {
                    "ref": "RoomController.html",
                    "tf": 1.8518518518518516
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "a": {
              "docs": {},
              "b": {
                "docs": {},
                "l": {
                  "docs": {
                    "RoomController.html#enablePlugin": {
                      "ref": "RoomController.html#enablePlugin",
                      "tf": 10
                    }
                  },
                  "e": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "n": {
                                "docs": {
                                  "RoomController.html#enablePlugin": {
                                    "ref": "RoomController.html#enablePlugin",
                                    "tf": 683.3333333333334
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          ".": {
            "docs": {},
            "g": {
              "docs": {
                "RoomController.html#eval": {
                  "ref": "RoomController.html#eval",
                  "tf": 3.8461538461538463
                }
              }
            }
          },
          "v": {
            "docs": {},
            "a": {
              "docs": {},
              "l": {
                "docs": {
                  "RoomController.html#eval": {
                    "ref": "RoomController.html#eval",
                    "tf": 683.3333333333334
                  }
                },
                "u": {
                  "docs": {
                    "RoomController.html#eval": {
                      "ref": "RoomController.html#eval",
                      "tf": 3.8461538461538463
                    }
                  }
                }
              }
            }
          }
        },
        "o": {
          "docs": {},
          "n": {
            "docs": {
              "Haxroomie.html": {
                "ref": "Haxroomie.html",
                "tf": 2
              },
              "Haxroomie.html#launchBrowser": {
                "ref": "Haxroomie.html#launchBrowser",
                "tf": 3.125
              },
              "RoomController.html": {
                "ref": "RoomController.html",
                "tf": 1.8518518518518516
              }
            }
          },
          "b": {
            "docs": {},
            "j": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "RoomController.html#openRoom": {
                        "ref": "RoomController.html#openRoom",
                        "tf": 30.555555555555557
                      },
                      "RoomController.html#getPlugins": {
                        "ref": "RoomController.html#getPlugins",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "a": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "module-haxroomie.html": {
                        "ref": "module-haxroomie.html",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "e": {
              "docs": {},
              "n": {
                "docs": {
                  "RoomController.html#openRoom": {
                    "ref": "RoomController.html#openRoom",
                    "tf": 1.8518518518518516
                  }
                },
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "m": {
                        "docs": {
                          "RoomController.html#openRoom": {
                            "ref": "RoomController.html#openRoom",
                            "tf": 675
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "RoomController.html#disablePlugin": {
                      "ref": "RoomController.html#disablePlugin",
                      "tf": 4.545454545454546
                    }
                  }
                }
              }
            }
          }
        },
        "s": {
          "docs": {},
          "p": {
            "docs": {},
            "a": {
              "docs": {},
              "w": {
                "docs": {},
                "n": {
                  "docs": {
                    "Haxroomie.html": {
                      "ref": "Haxroomie.html",
                      "tf": 2
                    }
                  }
                }
              }
            }
          }
        },
        "t": {
          "docs": {},
          "a": {
            "docs": {},
            "b": {
              "docs": {
                "Haxroomie.html": {
                  "ref": "Haxroomie.html",
                  "tf": 2
                },
                "Haxroomie.html#removeRoom": {
                  "ref": "Haxroomie.html#removeRoom",
                  "tf": 4.545454545454546
                },
                "RoomController.html": {
                  "ref": "RoomController.html",
                  "tf": 1.8518518518518516
                },
                "RoomController.html#openRoom": {
                  "ref": "RoomController.html#openRoom",
                  "tf": 1.8518518518518516
                },
                "RoomController.html#eval": {
                  "ref": "RoomController.html#eval",
                  "tf": 3.8461538461538463
                }
              }
            }
          },
          "o": {
            "docs": {},
            "p": {
              "docs": {
                "RoomController.html#openRoom": {
                  "ref": "RoomController.html#openRoom",
                  "tf": 1.8518518518518516
                }
              }
            }
          }
        },
        "f": {
          "docs": {},
          "u": {
            "docs": {},
            "n": {
              "docs": {},
              "c": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {
                          "Haxroomie.html#launchBrowser": {
                            "ref": "Haxroomie.html#launchBrowser",
                            "tf": 110
                          },
                          "Haxroomie.html#closeBrowser": {
                            "ref": "Haxroomie.html#closeBrowser",
                            "tf": 110
                          },
                          "Haxroomie.html#hasRoom": {
                            "ref": "Haxroomie.html#hasRoom",
                            "tf": 110
                          },
                          "Haxroomie.html#getRoom": {
                            "ref": "Haxroomie.html#getRoom",
                            "tf": 110
                          },
                          "Haxroomie.html#getRooms": {
                            "ref": "Haxroomie.html#getRooms",
                            "tf": 110
                          },
                          "Haxroomie.html#getFirstRoom": {
                            "ref": "Haxroomie.html#getFirstRoom",
                            "tf": 110
                          },
                          "Haxroomie.html#removeRoom": {
                            "ref": "Haxroomie.html#removeRoom",
                            "tf": 110
                          },
                          "Haxroomie.html#addRoom": {
                            "ref": "Haxroomie.html#addRoom",
                            "tf": 110
                          },
                          "RoomController.html#openRoom": {
                            "ref": "RoomController.html#openRoom",
                            "tf": 110
                          },
                          "RoomController.html#closeRoom": {
                            "ref": "RoomController.html#closeRoom",
                            "tf": 110
                          },
                          "RoomController.html#callRoom": {
                            "ref": "RoomController.html#callRoom",
                            "tf": 118.33333333333333
                          },
                          "RoomController.html#kick": {
                            "ref": "RoomController.html#kick",
                            "tf": 110
                          },
                          "RoomController.html#ban": {
                            "ref": "RoomController.html#ban",
                            "tf": 110
                          },
                          "RoomController.html#unban": {
                            "ref": "RoomController.html#unban",
                            "tf": 110
                          },
                          "RoomController.html#bannedPlayers": {
                            "ref": "RoomController.html#bannedPlayers",
                            "tf": 110
                          },
                          "RoomController.html#getPlugins": {
                            "ref": "RoomController.html#getPlugins",
                            "tf": 110
                          },
                          "RoomController.html#getPlugin": {
                            "ref": "RoomController.html#getPlugin",
                            "tf": 110
                          },
                          "RoomController.html#enablePlugin": {
                            "ref": "RoomController.html#enablePlugin",
                            "tf": 110
                          },
                          "RoomController.html#disablePlugin": {
                            "ref": "RoomController.html#disablePlugin",
                            "tf": 110
                          },
                          "RoomController.html#getPluginsThatDependOn": {
                            "ref": "RoomController.html#getPluginsThatDependOn",
                            "tf": 110
                          },
                          "RoomController.html#eval": {
                            "ref": "RoomController.html#eval",
                            "tf": 110
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "r": {
              "docs": {},
              "s": {
                "docs": {},
                "t": {
                  "docs": {
                    "Haxroomie.html#getFirstRoom": {
                      "ref": "Haxroomie.html#getFirstRoom",
                      "tf": 12.5
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "e": {
                "docs": {
                  "RoomController.html#openRoom": {
                    "ref": "RoomController.html#openRoom",
                    "tf": 1.8518518518518516
                  }
                }
              }
            }
          },
          "n": {
            "docs": {
              "RoomController.html#callRoom": {
                "ref": "RoomController.html#callRoom",
                "tf": 33.33333333333333
              }
            }
          }
        },
        "p": {
          "docs": {},
          "o": {
            "docs": {},
            "r": {
              "docs": {},
              "t": {
                "docs": {
                  "Haxroomie.html#launchBrowser": {
                    "ref": "Haxroomie.html#launchBrowser",
                    "tf": 3.125
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "s": {
                "docs": {},
                "i": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "Haxroomie.html#launchBrowser": {
                          "ref": "Haxroomie.html#launchBrowser",
                          "tf": 3.125
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "p": {
              "docs": {},
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Haxroomie.html#launchBrowser": {
                        "ref": "Haxroomie.html#launchBrowser",
                        "tf": 3.125
                      },
                      "Haxroomie.html#closeBrowser": {
                        "ref": "Haxroomie.html#closeBrowser",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "v": {
                "docs": {},
                "i": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 1.8518518518518516
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "RoomController.html#openRoom": {
                            "ref": "RoomController.html#openRoom",
                            "tf": 3.7037037037037033
                          }
                        }
                      }
                    }
                  }
                }
              },
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      ".": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              ";": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "y": {
                                          "docs": {},
                                          ".": {
                                            "docs": {},
                                            "&": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  ";": {
                                                    "docs": {},
                                                    "p": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {},
                                                        "u": {
                                                          "docs": {},
                                                          "g": {
                                                            "docs": {},
                                                            "i": {
                                                              "docs": {},
                                                              "n": {
                                                                "docs": {},
                                                                "d": {
                                                                  "docs": {},
                                                                  "a": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {},
                                                                      "a": {
                                                                        "docs": {},
                                                                        "&": {
                                                                          "docs": {},
                                                                          "g": {
                                                                            "docs": {},
                                                                            "t": {
                                                                              "docs": {},
                                                                              ";": {
                                                                                "docs": {},
                                                                                "&": {
                                                                                  "docs": {},
                                                                                  "g": {
                                                                                    "docs": {},
                                                                                    "t": {
                                                                                      "docs": {
                                                                                        "RoomController.html#getPlugins": {
                                                                                          "ref": "RoomController.html#getPlugins",
                                                                                          "tf": 33.33333333333333
                                                                                        },
                                                                                        "RoomController.html#getPluginsThatDependOn": {
                                                                                          "ref": "RoomController.html#getPluginsThatDependOn",
                                                                                          "tf": 25
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "p": {
                                  "docs": {},
                                  "l": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "&": {
                                                      "docs": {},
                                                      "g": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "RoomController.html#getPlugin": {
                                                              "ref": "RoomController.html#getPlugin",
                                                              "tf": 25
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "b": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "n": {
                                              "docs": {},
                                              "&": {
                                                "docs": {},
                                                "g": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "RoomController.html#disablePlugin": {
                                                        "ref": "RoomController.html#disablePlugin",
                                                        "tf": 25
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "y": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "RoomController.html#kick": {
                        "ref": "RoomController.html#kick",
                        "tf": 16.666666666666664
                      },
                      "RoomController.html#ban": {
                        "ref": "RoomController.html#ban",
                        "tf": 16.666666666666664
                      },
                      "RoomController.html#unban": {
                        "ref": "RoomController.html#unban",
                        "tf": 10
                      },
                      "RoomController.html#bannedPlayers": {
                        "ref": "RoomController.html#bannedPlayers",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "g": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "RoomController.html#getPlugin": {
                        "ref": "RoomController.html#getPlugin",
                        "tf": 10
                      },
                      "RoomController.html#enablePlugin": {
                        "ref": "RoomController.html#enablePlugin",
                        "tf": 10
                      },
                      "RoomController.html#disablePlugin": {
                        "ref": "RoomController.html#disablePlugin",
                        "tf": 9.090909090909092
                      },
                      "RoomController.html#getPluginsThatDependOn": {
                        "ref": "RoomController.html#getPluginsThatDependOn",
                        "tf": 16.666666666666664
                      }
                    },
                    "d": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "a": {
                            "docs": {
                              "RoomController.html#getPlugins": {
                                "ref": "RoomController.html#getPlugins",
                                "tf": 12.5
                              },
                              "RoomController.html#getPlugin": {
                                "ref": "RoomController.html#getPlugin",
                                "tf": 10
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "u": {
          "docs": {},
          "s": {
            "docs": {
              "Haxroomie.html#launchBrowser": {
                "ref": "Haxroomie.html#launchBrowser",
                "tf": 3.125
              },
              "RoomController.html#openRoom": {
                "ref": "RoomController.html#openRoom",
                "tf": 1.8518518518518516
              }
            },
            "a": {
              "docs": {},
              "b": {
                "docs": {},
                "l": {
                  "docs": {
                    "RoomController.html#openRoom": {
                      "ref": "RoomController.html#openRoom",
                      "tf": 1.8518518518518516
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "b": {
              "docs": {},
              "a": {
                "docs": {},
                "n": {
                  "docs": {
                    "RoomController.html#unban": {
                      "ref": "RoomController.html#unban",
                      "tf": 683.3333333333334
                    }
                  }
                }
              }
            }
          }
        },
        "n": {
          "docs": {},
          "e": {
            "docs": {},
            "w": {
              "docs": {
                "Haxroomie.html#addRoom": {
                  "ref": "Haxroomie.html#addRoom",
                  "tf": 8.333333333333332
                },
                "RoomController.html": {
                  "ref": "RoomController.html",
                  "tf": 1.8518518518518516
                }
              }
            }
          },
          "a": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "RoomController.html#getPlugin": {
                    "ref": "RoomController.html#getPlugin",
                    "tf": 25
                  },
                  "RoomController.html#enablePlugin": {
                    "ref": "RoomController.html#enablePlugin",
                    "tf": 33.33333333333333
                  },
                  "RoomController.html#disablePlugin": {
                    "ref": "RoomController.html#disablePlugin",
                    "tf": 29.545454545454547
                  },
                  "RoomController.html#getPluginsThatDependOn": {
                    "ref": "RoomController.html#getPluginsThatDependOn",
                    "tf": 25
                  }
                }
              }
            }
          }
        },
        "k": {
          "docs": {},
          "i": {
            "docs": {},
            "c": {
              "docs": {},
              "k": {
                "docs": {
                  "RoomController.html#kick": {
                    "ref": "RoomController.html#kick",
                    "tf": 700
                  }
                }
              }
            }
          }
        },
        "j": {
          "docs": {},
          "s": {
            "docs": {
              "RoomController.html#eval": {
                "ref": "RoomController.html#eval",
                "tf": 33.33333333333333
              }
            }
          }
        }
      },
      "length": 297
    },
    "corpusTokens": [
      "access",
      "ad",
      "add",
      "addroom",
      "anyth",
      "array",
      "array.&lt;roomcontroller&gt",
      "avail",
      "ban",
      "bannedplay",
      "befor",
      "boolean",
      "browser",
      "call",
      "callroom",
      "check",
      "chrome",
      "class",
      "close",
      "closebrows",
      "closeroom",
      "code",
      "commun",
      "config",
      "const",
      "constructor",
      "contain",
      "context",
      "control",
      "creat",
      "debug",
      "delet",
      "depend",
      "directli",
      "disabl",
      "disableplugin",
      "document",
      "e.g",
      "each",
      "enabl",
      "enableplugin",
      "eval",
      "evalu",
      "file",
      "first",
      "fn",
      "function",
      "get",
      "getfirstroom",
      "getplugin",
      "getpluginsthatdependon",
      "getroom",
      "given",
      "global",
      "gui",
      "hasroom",
      "haxbal",
      "haxroomi",
      "haxroomie#addroom",
      "haxroomie#closebrows",
      "haxroomie#getfirstroom",
      "haxroomie#getroom",
      "haxroomie#hasroom",
      "haxroomie#launchbrows",
      "haxroomie#removeroom",
      "headless",
      "here",
      "hhm",
      "hhm.manager.room",
      "host",
      "hrconfig",
      "id",
      "index",
      "instanc",
      "interfac",
      "iter",
      "iterable.&lt;object&gt",
      "js",
      "kick",
      "launch",
      "launchbrows",
      "list",
      "list:class",
      "list:modul",
      "lt;async&gt",
      "main",
      "manag",
      "ment",
      "method",
      "modul",
      "module:haxroomi",
      "name",
      "new",
      "object",
      "obtain",
      "on",
      "open",
      "openroom",
      "order",
      "player",
      "plugin",
      "plugindata",
      "port",
      "possibl",
      "promise.&lt;array.&lt;plugindata&gt;&gt",
      "promise.&lt;boolean&gt",
      "promise.&lt;plugindata&gt",
      "properti",
      "provid",
      "puppet",
      "readm",
      "remot",
      "remov",
      "removeroom",
      "requir",
      "require('haxroomi",
      "return",
      "room",
      "room.eval('hhm.manager.room.getplayerlist",
      "roomcontrol",
      "roomcontroller#ban",
      "roomcontroller#bannedplay",
      "roomcontroller#callroom",
      "roomcontroller#closeroom",
      "roomcontroller#disableplugin",
      "roomcontroller#enableplugin",
      "roomcontroller#ev",
      "roomcontroller#getplugin",
      "roomcontroller#getpluginsthatdependon",
      "roomcontroller#kick",
      "roomcontroller#openroom",
      "roomcontroller#unban",
      "roomobject",
      "run",
      "spawn",
      "tab",
      "top",
      "unban",
      "us",
      "usabl",
      "want",
      "within",
      "without"
    ],
    "pipeline": [
      "trimmer",
      "stopWordFilter",
      "stemmer"
    ]
  },
  "store": {
    "index.html": {
      "id": "index.html",
      "kind": "readme",
      "title": "Haxroomie",
      "longname": "index",
      "name": "Haxroomie",
      "tags": "index",
      "summary": "Host HaxBall rooms without GUI.",
      "description": "",
      "body": ""
    },
    "global.html": {
      "id": "global.html",
      "kind": "global",
      "title": "Globals",
      "longname": "global",
      "name": "Globals",
      "tags": "global",
      "summary": "All documented globals.",
      "description": "",
      "body": ""
    },
    "list_class.html": {
      "id": "list_class.html",
      "kind": "list",
      "title": "Classes",
      "longname": "list:class",
      "name": "Classes",
      "tags": "list:class",
      "summary": "All documented classes.",
      "description": "",
      "body": ""
    },
    "list_module.html": {
      "id": "list_module.html",
      "kind": "list",
      "title": "Modules",
      "longname": "list:module",
      "name": "Modules",
      "tags": "list:module",
      "summary": "All documented modules.",
      "description": "",
      "body": ""
    },
    "Haxroomie.html": {
      "id": "Haxroomie.html",
      "kind": "class",
      "title": "Haxroomie",
      "longname": "Haxroomie",
      "name": "Haxroomie",
      "tags": "Haxroomie",
      "summary": "",
      "description": "Class for spawning the headless chrome browser and managing RoomControllers. Each RoomController controls one room running in a browsers tab. After creating the Haxroomie instance it is required to launch the browser with the launchBrowser method before anything else.",
      "body": ""
    },
    "Haxroomie.html#launchBrowser": {
      "id": "Haxroomie.html#launchBrowser",
      "kind": "function",
      "title": "&lt;async&gt; launchBrowser()",
      "longname": "Haxroomie#launchBrowser",
      "name": "launchBrowser",
      "tags": "Haxroomie#launchBrowser launchBrowser",
      "summary": "",
      "description": "Launches the puppeteer controlled browser using the remote-debugging-port given in Haxroomie classes constructor. It is only possible to launch one browser."
    },
    "Haxroomie.html#closeBrowser": {
      "id": "Haxroomie.html#closeBrowser",
      "kind": "function",
      "title": "&lt;async&gt; closeBrowser()",
      "longname": "Haxroomie#closeBrowser",
      "name": "closeBrowser",
      "tags": "Haxroomie#closeBrowser closeBrowser",
      "summary": "",
      "description": "Closes the puppeteer controlled browser."
    },
    "Haxroomie.html#hasRoom": {
      "id": "Haxroomie.html#hasRoom",
      "kind": "function",
      "title": "hasRoom( id ) → {boolean}",
      "longname": "Haxroomie#hasRoom",
      "name": "hasRoom",
      "tags": "Haxroomie#hasRoom hasRoom",
      "summary": "",
      "description": "Checks if there is a room running with the given id."
    },
    "Haxroomie.html#getRoom": {
      "id": "Haxroomie.html#getRoom",
      "kind": "function",
      "title": "getRoom( id ) → {RoomController}",
      "longname": "Haxroomie#getRoom",
      "name": "getRoom",
      "tags": "Haxroomie#getRoom getRoom",
      "summary": "",
      "description": "Returns a RoomController with the given id."
    },
    "Haxroomie.html#getRooms": {
      "id": "Haxroomie.html#getRooms",
      "kind": "function",
      "title": "getRooms() → {Array.&lt;RoomController&gt;}",
      "longname": "Haxroomie#getRooms",
      "name": "getRooms",
      "tags": "Haxroomie#getRooms getRooms",
      "summary": "",
      "description": "Returns an array of available RoomControllers."
    },
    "Haxroomie.html#getFirstRoom": {
      "id": "Haxroomie.html#getFirstRoom",
      "kind": "function",
      "title": "getFirstRoom() → {RoomController}",
      "longname": "Haxroomie#getFirstRoom",
      "name": "getFirstRoom",
      "tags": "Haxroomie#getFirstRoom getFirstRoom",
      "summary": "",
      "description": "Returns the RoomController that was first added."
    },
    "Haxroomie.html#removeRoom": {
      "id": "Haxroomie.html#removeRoom",
      "kind": "function",
      "title": "&lt;async&gt; removeRoom( id )",
      "longname": "Haxroomie#removeRoom",
      "name": "removeRoom",
      "tags": "Haxroomie#removeRoom removeRoom",
      "summary": "",
      "description": "Removes a RoomController with the given id. Removing deletes the RoomController and closes the browser tab it is controlling."
    },
    "Haxroomie.html#addRoom": {
      "id": "Haxroomie.html#addRoom",
      "kind": "function",
      "title": "&lt;async&gt; addRoom( id ) → {RoomController}",
      "longname": "Haxroomie#addRoom",
      "name": "addRoom",
      "tags": "Haxroomie#addRoom addRoom",
      "summary": "",
      "description": "Creates and adds a new RoomController with the given id."
    },
    "RoomController.html": {
      "id": "RoomController.html",
      "kind": "class",
      "title": "RoomController",
      "longname": "RoomController",
      "name": "RoomController",
      "tags": "RoomController",
      "summary": "",
      "description": "RoomController provides an interface to communicate with HaxBall roomObject and Haxball Headless Manager (HHM). Each RoomController controls one tab in the headless browser. Create new RoomController instances with the Haxroomie#addRoom method. The constructor is not ment to be called directly!",
      "body": ""
    },
    "RoomController.html#openRoom": {
      "id": "RoomController.html#openRoom",
      "kind": "function",
      "title": "&lt;async&gt; openRoom( config ) → {object}",
      "longname": "RoomController#openRoom",
      "name": "openRoom",
      "tags": "RoomController#openRoom openRoom",
      "summary": "",
      "description": "Opens a HaxBall room in a browser tab. On top of the documentated properties here, the config object can contain any properties you want to use in your own HHM config file. The config object is usable globally from within the HHM config as the hrConfig object."
    },
    "RoomController.html#closeRoom": {
      "id": "RoomController.html#closeRoom",
      "kind": "function",
      "title": "&lt;async&gt; closeRoom()",
      "longname": "RoomController#closeRoom",
      "name": "closeRoom",
      "tags": "RoomController#closeRoom closeRoom",
      "summary": "",
      "description": "Closes the headless haxball room."
    },
    "RoomController.html#callRoom": {
      "id": "RoomController.html#callRoom",
      "kind": "function",
      "title": "&lt;async&gt; callRoom( fn )",
      "longname": "RoomController#callRoom",
      "name": "callRoom",
      "tags": "RoomController#callRoom callRoom",
      "summary": "",
      "description": "Calls a function of the HaxBall roomObject in the browsers context."
    },
    "RoomController.html#kick": {
      "id": "RoomController.html#kick",
      "kind": "function",
      "title": "&lt;async&gt; kick( id )",
      "longname": "RoomController#kick",
      "name": "kick",
      "tags": "RoomController#kick kick",
      "summary": "",
      "description": "Kicks a player from the room."
    },
    "RoomController.html#ban": {
      "id": "RoomController.html#ban",
      "kind": "function",
      "title": "&lt;async&gt; ban( id )",
      "longname": "RoomController#ban",
      "name": "ban",
      "tags": "RoomController#ban ban",
      "summary": "",
      "description": "Bans a player from the room."
    },
    "RoomController.html#unban": {
      "id": "RoomController.html#unban",
      "kind": "function",
      "title": "&lt;async&gt; unban( id )",
      "longname": "RoomController#unban",
      "name": "unban",
      "tags": "RoomController#unban unban",
      "summary": "",
      "description": "Removes a the ban of a given player id."
    },
    "RoomController.html#bannedPlayers": {
      "id": "RoomController.html#bannedPlayers",
      "kind": "function",
      "title": "&lt;async&gt; bannedPlayers() → {Iterable.&lt;object&gt;}",
      "longname": "RoomController#bannedPlayers",
      "name": "bannedPlayers",
      "tags": "RoomController#bannedPlayers bannedPlayers",
      "summary": "",
      "description": "Returns an Iterator of banned players."
    },
    "RoomController.html#getPlugins": {
      "id": "RoomController.html#getPlugins",
      "kind": "function",
      "title": "&lt;async&gt; getPlugins() → {Promise.&lt;Array.&lt;PluginData&gt;&gt;}",
      "longname": "RoomController#getPlugins",
      "name": "getPlugins",
      "tags": "RoomController#getPlugins getPlugins",
      "summary": "",
      "description": "Returns a list of PluginData objects."
    },
    "RoomController.html#getPlugin": {
      "id": "RoomController.html#getPlugin",
      "kind": "function",
      "title": "&lt;async&gt; getPlugin( name ) → {Promise.&lt;PluginData&gt;}",
      "longname": "RoomController#getPlugin",
      "name": "getPlugin",
      "tags": "RoomController#getPlugin getPlugin",
      "summary": "",
      "description": "Returns PluginData of the given plugin id."
    },
    "RoomController.html#enablePlugin": {
      "id": "RoomController.html#enablePlugin",
      "kind": "function",
      "title": "&lt;async&gt; enablePlugin( name )",
      "longname": "RoomController#enablePlugin",
      "name": "enablePlugin",
      "tags": "RoomController#enablePlugin enablePlugin",
      "summary": "",
      "description": "Enables a HHM plugin with the given id."
    },
    "RoomController.html#disablePlugin": {
      "id": "RoomController.html#disablePlugin",
      "kind": "function",
      "title": "&lt;async&gt; disablePlugin( name ) → {Promise.&lt;boolean&gt;}",
      "longname": "RoomController#disablePlugin",
      "name": "disablePlugin",
      "tags": "RoomController#disablePlugin disablePlugin",
      "summary": "",
      "description": "Disables a HHM plugin with the given id. If the name is an Array then it disables all the plugins in the given order."
    },
    "RoomController.html#getPluginsThatDependOn": {
      "id": "RoomController.html#getPluginsThatDependOn",
      "kind": "function",
      "title": "&lt;async&gt; getPluginsThatDependOn( name ) → {Promise.&lt;Array.&lt;PluginData&gt;&gt;}",
      "longname": "RoomController#getPluginsThatDependOn",
      "name": "getPluginsThatDependOn",
      "tags": "RoomController#getPluginsThatDependOn getPluginsThatDependOn",
      "summary": "",
      "description": "Gets a list of plugins that depend on the given plugin."
    },
    "RoomController.html#eval": {
      "id": "RoomController.html#eval",
      "kind": "function",
      "title": "&lt;async&gt; eval( js )",
      "longname": "RoomController#eval",
      "name": "eval",
      "tags": "RoomController#eval eval",
      "summary": "",
      "description": "Evaluates the given code in the browser tab room is running. You can access the HaxBall roomObject with HHM.manager.room. E.g. room.eval('HHM.manager.room.getPlayerList()');"
    },
    "module-haxroomie.html": {
      "id": "module-haxroomie.html",
      "kind": "module",
      "title": "haxroomie",
      "longname": "module:haxroomie",
      "name": "haxroomie",
      "tags": "module:haxroomie",
      "summary": "",
      "description": "Main module of Haxroomie. Can be obtained with const haxroomie = require('haxroomie');",
      "body": ""
    }
  }
};