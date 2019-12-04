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
          "document",
          "haxroomi",
          "index",
          "readm",
          "tutori"
        ],
        "global.html": [
          "document",
          "global"
        ],
        "undefined": [
          "cli",
          "haxroomi",
          "instal",
          "tutori",
          "ubuntu"
        ],
        "list_tutorial.html": [
          "avail",
          "list",
          "list:tutori",
          "tutori"
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
          "function",
          "haxroomie#addroom",
          "id",
          "lt;async&gt",
          "new",
          "number",
          "roomcontrol",
          "roomcontrolleropt",
          "string",
          "us"
        ],
        "RoomController.html": [
          "api",
          "browser",
          "call",
          "class",
          "commun",
          "control",
          "creat",
          "each",
          "event",
          "factori",
          "fire",
          "haxbal",
          "haxroomie#addroom",
          "headless",
          "hhm",
          "instanc",
          "interfac",
          "listen",
          "manag",
          "method",
          "new",
          "on",
          "option",
          "promis",
          "provid",
          "readi",
          "roomcontrol",
          "roomobject",
          "tab",
          "way"
        ],
        "RoomController.html#running": [
          "boolean",
          "member",
          "room",
          "roomcontroller#run",
          "run"
        ],
        "RoomController.html#hhmLoaded": [
          "boolean",
          "haxbal",
          "headless",
          "hhmload",
          "load",
          "manag",
          "member",
          "roomcontroller#hhmload"
        ],
        "RoomController.html#usable": [
          "boolean",
          "instanc",
          "member",
          "roomcontroller#us",
          "still",
          "usabl"
        ],
        "RoomController.html#roomInfo": [
          "contain",
          "copi",
          "data",
          "e.g",
          "member",
          "null",
          "object",
          "origin",
          "return",
          "room",
          "roomcontroller#roominfo",
          "roominfo",
          "roominfo.roomlink",
          "run"
        ],
        "RoomController.html#openRoomLock": [
          "boolean",
          "member",
          "open",
          "openroomlock",
          "process",
          "room",
          "roomcontroller#openroomlock",
          "true"
        ],
        "RoomController.html#plugins": [
          "control",
          "inform",
          "member",
          "object",
          "plugin",
          "plugincontrol",
          "requir",
          "room",
          "roomcontroller#plugin",
          "run",
          "us"
        ],
        "RoomController.html#repositories": [
          "control",
          "hhm",
          "inform",
          "init",
          "librari",
          "load",
          "member",
          "method",
          "object",
          "open",
          "openroom",
          "repositori",
          "repositorycontrol",
          "requir",
          "room",
          "roomcontroller#repositori",
          "us"
        ],
        "RoomController.html#roles": [
          "control",
          "enabl",
          "inform",
          "load",
          "member",
          "object",
          "plugin",
          "requir",
          "role",
          "rolecontrol",
          "room",
          "roomcontroller#rol",
          "run",
          "sav/rol",
          "us"
        ],
        "RoomController.html#init": [
          "befor",
          "call",
          "close",
          "enabl",
          "function",
          "haxbal",
          "headless",
          "inform",
          "init",
          "initi",
          "librari",
          "load",
          "lt;async&gt",
          "manag",
          "navig",
          "note",
          "object",
          "open",
          "option",
          "page",
          "repositori",
          "room",
          "roomcontrol",
          "roomcontroller#init",
          "undo",
          "url",
          "us"
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
        "RoomController.html#callRoom": [
          "browser",
          "call",
          "callroom",
          "context",
          "fn",
          "function",
          "haxbal",
          "lt;async&gt",
          "promise.&lt;any&gt",
          "roomcontroller#callroom",
          "roomobject"
        ],
        "RoomController.html#eval": [
          "access",
          "arg",
          "browser",
          "code",
          "control",
          "e.g",
          "eval",
          "evalu",
          "function",
          "given",
          "haxbal",
          "hhm.manager.room",
          "instac",
          "lt;async&gt",
          "page.evalu",
          "pagefunct",
          "promise.&lt;serializable&gt",
          "puppet",
          "room.eval('hhm.manager.room.getplayerlist",
          "roomcontroller#ev",
          "roomobject",
          "tab",
          "wrapper"
        ],
        "RoomController.html#closeRoom": [
          "close",
          "closeroom",
          "function",
          "haxbal",
          "headless",
          "lt;async&gt",
          "navig",
          "out",
          "page",
          "room",
          "roomcontroller#closeroom",
          "url"
        ],
        "PluginController.html": [
          "class",
          "control",
          "haxbal",
          "headless",
          "hhm",
          "manag",
          "plugin",
          "plugincontrol"
        ],
        "PluginController.html#getPlugins": [
          "function",
          "getplugin",
          "load",
          "lt;async&gt",
          "plugin",
          "plugincontroller#getplugin",
          "promise.&lt;array.&lt;plugindata&gt;&gt",
          "return"
        ],
        "PluginController.html#getPlugin": [
          "function",
          "getplugin",
          "given",
          "lt;async&gt",
          "name",
          "plugin",
          "plugincontroller#getplugin",
          "plugindata",
          "promise.&lt;?plugindata&gt",
          "return"
        ],
        "PluginController.html#enablePlugin": [
          "enabl",
          "enableplugin",
          "function",
          "given",
          "hhm",
          "lt;async&gt",
          "name",
          "plugin",
          "plugincontroller#enableplugin",
          "promise.&lt;boolean&gt"
        ],
        "PluginController.html#disablePlugin": [
          "array",
          "disabl",
          "disableplugin",
          "function",
          "given",
          "hhm",
          "lt;async&gt",
          "name",
          "order",
          "plugin",
          "plugincontroller#disableplugin",
          "promise.&lt;array.&lt;number&gt;&gt",
          "recurs"
        ],
        "PluginController.html#getPluginsThatDependOn": [
          "depend",
          "function",
          "get",
          "getpluginsthatdependon",
          "given",
          "includedis",
          "list",
          "lt;async&gt",
          "name",
          "plugin",
          "plugincontroller#getpluginsthatdependon",
          "promise.&lt;array.&lt;plugindata&gt;&gt",
          "recurs"
        ],
        "PluginController.html#hasPlugin": [
          "check",
          "function",
          "given",
          "hasplugin",
          "load",
          "lt;async&gt",
          "name",
          "plugin",
          "plugincontroller#hasplugin",
          "promise.&lt;boolean&gt",
          "room"
        ],
        "PluginController.html#addPlugin": [
          "add",
          "addplugin",
          "avail",
          "content",
          "function",
          "load",
          "lt;async&gt",
          "new",
          "plugin",
          "pluginconfig",
          "plugincontroller#addplugin",
          "promise.&lt;number&gt",
          "repositori",
          "string"
        ],
        "PluginController.html#removePlugin": [
          "function",
          "lt;async&gt",
          "plugin",
          "plugincontroller#removeplugin",
          "pluginnam",
          "promise.&lt;boolean&gt",
          "remov",
          "removeplugin",
          "safe"
        ],
        "PluginController.html#setPluginConfig": [
          "avail",
          "config",
          "function",
          "given",
          "load",
          "lt;async&gt",
          "plugin",
          "pluginconfig",
          "plugincontroller#setpluginconfig",
          "pluginnam",
          "remov",
          "repositori",
          "room",
          "set",
          "setpluginconfig",
          "tri"
        ],
        "PluginController.html#getPluginConfig": [
          "config",
          "function",
          "getpluginconfig",
          "given",
          "load",
          "lt;async&gt",
          "plugin",
          "plugincontroller#getpluginconfig",
          "pluginnam",
          "promise.&lt;object&gt",
          "return",
          "room"
        ],
        "RepositoryController.html": [
          "class",
          "control",
          "haxbal",
          "headless",
          "hhm",
          "manag",
          "repositori",
          "repositorycontrol"
        ],
        "RepositoryController.html#addRepository": [
          "ad",
          "add",
          "addrepositori",
          "append",
          "can't",
          "found",
          "function",
          "highest",
          "i.",
          "load",
          "lowest",
          "lt;async&gt",
          "new",
          "otherwis",
          "plugin",
          "prioriti",
          "promise.&lt;boolean&gt",
          "repositori",
          "repositorycontroller#addrepositori",
          "set",
          "true"
        ],
        "RepositoryController.html#hasRepository": [
          "alreadi",
          "boolean",
          "configur",
          "consid",
          "equal",
          "exist",
          "function",
          "given",
          "hasrepositori",
          "lt;async&gt",
          "repositori",
          "repositorycontroller#hasrepositori",
          "return",
          "same",
          "whether"
        ],
        "RepositoryController.html#getRepositories": [
          "array.&lt;repository&gt",
          "avail",
          "function",
          "getrepositori",
          "lt;async&gt",
          "repositori",
          "repositorycontroller#getrepositori",
          "return"
        ],
        "RepositoryController.html#getRepositoryInformation": [
          "config",
          "file",
          "function",
          "getrepositoryinform",
          "given",
          "inform",
          "load",
          "lt;async&gt",
          "repositori",
          "repository.json",
          "repositorycontroller#getrepositoryinform",
          "repositorydata",
          "retriev"
        ],
        "module-haxroomie.html": [
          "haxroomi",
          "modul",
          "module:haxroomi"
        ]
      },
      "length": 46
    },
    "tokenStore": {
      "root": {
        "docs": {},
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
                          "index.html": {
                            "ref": "index.html",
                            "tf": 35
                          },
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
                      "PluginController.html#getPluginsThatDependOn": {
                        "ref": "PluginController.html#getPluginsThatDependOn",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "t": {
              "docs": {},
              "a": {
                "docs": {
                  "RoomController.html#roomInfo": {
                    "ref": "RoomController.html#roomInfo",
                    "tf": 4.166666666666666
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "s": {
              "docs": {},
              "a": {
                "docs": {},
                "b": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "PluginController.html#disablePlugin": {
                        "ref": "PluginController.html#disablePlugin",
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
                                    "PluginController.html#disablePlugin": {
                                      "ref": "PluginController.html#disablePlugin",
                                      "tf": 670
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
                          "undefined": {
                            "tf": 625
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
                            "tf": 600
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
                                              "tf": 1.3513513513513513
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
              "b": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 2.7027027027027026
                      },
                      "RoomController.html#hhmLoaded": {
                        "ref": "RoomController.html#hhmLoaded",
                        "tf": 12.5
                      },
                      "RoomController.html#init": {
                        "ref": "RoomController.html#init",
                        "tf": 4
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
                        "tf": 3.125
                      },
                      "RoomController.html#closeRoom": {
                        "ref": "RoomController.html#closeRoom",
                        "tf": 10
                      },
                      "PluginController.html": {
                        "ref": "PluginController.html",
                        "tf": 7.142857142857142
                      },
                      "RepositoryController.html": {
                        "ref": "RepositoryController.html",
                        "tf": 7.142857142857142
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
                },
                "e": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "i": {
                                  "docs": {
                                    "RepositoryController.html#hasRepository": {
                                      "ref": "RepositoryController.html#hasRepository",
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
                            "PluginController.html#hasPlugin": {
                              "ref": "PluginController.html#hasPlugin",
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
          },
          "h": {
            "docs": {},
            "m": {
              "docs": {
                "undefined": {
                  "tf": 625
                },
                "RoomController.html": {
                  "ref": "RoomController.html",
                  "tf": 1.3513513513513513
                },
                "RoomController.html#repositories": {
                  "ref": "RoomController.html#repositories",
                  "tf": 5.88235294117647
                },
                "RoomController.html#openRoom": {
                  "ref": "RoomController.html#openRoom",
                  "tf": 3.7037037037037033
                },
                "PluginController.html": {
                  "ref": "PluginController.html",
                  "tf": 7.142857142857142
                },
                "PluginController.html#enablePlugin": {
                  "ref": "PluginController.html#enablePlugin",
                  "tf": 10
                },
                "PluginController.html#disablePlugin": {
                  "ref": "PluginController.html#disablePlugin",
                  "tf": 4.545454545454546
                },
                "RepositoryController.html": {
                  "ref": "RepositoryController.html",
                  "tf": 7.142857142857142
                }
              },
              "l": {
                "docs": {},
                "o": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "RoomController.html#hhmLoaded": {
                          "ref": "RoomController.html#hhmLoaded",
                          "tf": 700
                        }
                      }
                    }
                  }
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
                                            "tf": 3.125
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
                            "tf": 2.7027027027027026
                          },
                          "RoomController.html#hhmLoaded": {
                            "ref": "RoomController.html#hhmLoaded",
                            "tf": 12.5
                          },
                          "RoomController.html#init": {
                            "ref": "RoomController.html#init",
                            "tf": 4
                          },
                          "RoomController.html#closeRoom": {
                            "ref": "RoomController.html#closeRoom",
                            "tf": 10
                          },
                          "PluginController.html": {
                            "ref": "PluginController.html",
                            "tf": 7.142857142857142
                          },
                          "RepositoryController.html": {
                            "ref": "RepositoryController.html",
                            "tf": 7.142857142857142
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
          },
          "i": {
            "docs": {},
            "g": {
              "docs": {},
              "h": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "RepositoryController.html#addRepository": {
                          "ref": "RepositoryController.html#addRepository",
                          "tf": 2.380952380952381
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
                  "l": {
                    "docs": {
                      "undefined": {
                        "tf": 625
                      }
                    }
                  },
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
                          "tf": 1.3513513513513513
                        },
                        "RoomController.html#usable": {
                          "ref": "RoomController.html#usable",
                          "tf": 16.666666666666664
                        }
                      }
                    }
                  },
                  "c": {
                    "docs": {
                      "RoomController.html#eval": {
                        "ref": "RoomController.html#eval",
                        "tf": 3.125
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
                            "tf": 1.3513513513513513
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
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "RoomController.html#plugins": {
                        "ref": "RoomController.html#plugins",
                        "tf": 6.25
                      },
                      "RoomController.html#repositories": {
                        "ref": "RoomController.html#repositories",
                        "tf": 2.941176470588235
                      },
                      "RoomController.html#roles": {
                        "ref": "RoomController.html#roles",
                        "tf": 4.166666666666666
                      },
                      "RoomController.html#init": {
                        "ref": "RoomController.html#init",
                        "tf": 2
                      },
                      "RepositoryController.html#getRepositoryInformation": {
                        "ref": "RepositoryController.html#getRepositoryInformation",
                        "tf": 10
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "t": {
                "docs": {
                  "RoomController.html#repositories": {
                    "ref": "RoomController.html#repositories",
                    "tf": 2.941176470588235
                  },
                  "RoomController.html#init": {
                    "ref": "RoomController.html#init",
                    "tf": 683.3333333333334
                  }
                },
                "i": {
                  "docs": {
                    "RoomController.html#init": {
                      "ref": "RoomController.html#init",
                      "tf": 2
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "l": {
                "docs": {},
                "u": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "PluginController.html#getPluginsThatDependOn": {
                                "ref": "PluginController.html#getPluginsThatDependOn",
                                "tf": 16.666666666666664
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
                "tf": 5
              }
            }
          },
          ".": {
            "docs": {
              "RepositoryController.html#addRepository": {
                "ref": "RepositoryController.html#addRepository",
                "tf": 2.380952380952381
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
                },
                "i": {
                  "docs": {
                    "RoomController.html": {
                      "ref": "RoomController.html",
                      "tf": 1.3513513513513513
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
                      },
                      "RoomController.html#plugins": {
                        "ref": "RoomController.html#plugins",
                        "tf": 6.25
                      },
                      "RoomController.html#repositories": {
                        "ref": "RoomController.html#repositories",
                        "tf": 2.941176470588235
                      },
                      "RoomController.html#roles": {
                        "ref": "RoomController.html#roles",
                        "tf": 4.166666666666666
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
                    "PluginController.html#removePlugin": {
                      "ref": "PluginController.html#removePlugin",
                      "tf": 25
                    },
                    "PluginController.html#setPluginConfig": {
                      "ref": "PluginController.html#setPluginConfig",
                      "tf": 2.380952380952381
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
                                  "PluginController.html#removePlugin": {
                                    "ref": "PluginController.html#removePlugin",
                                    "tf": 670
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
                      "RoomController.html#roomInfo": {
                        "ref": "RoomController.html#roomInfo",
                        "tf": 4.166666666666666
                      },
                      "PluginController.html#getPlugins": {
                        "ref": "PluginController.html#getPlugins",
                        "tf": 16.666666666666664
                      },
                      "PluginController.html#getPlugin": {
                        "ref": "PluginController.html#getPlugin",
                        "tf": 10
                      },
                      "PluginController.html#getPluginConfig": {
                        "ref": "PluginController.html#getPluginConfig",
                        "tf": 9.090909090909092
                      },
                      "RepositoryController.html#hasRepository": {
                        "ref": "RepositoryController.html#hasRepository",
                        "tf": 4.545454545454546
                      },
                      "RepositoryController.html#getRepositories": {
                        "ref": "RepositoryController.html#getRepositories",
                        "tf": 16.666666666666664
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "i": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "v": {
                      "docs": {
                        "RepositoryController.html#getRepositoryInformation": {
                          "ref": "RepositoryController.html#getRepositoryInformation",
                          "tf": 5
                        }
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "o": {
                "docs": {},
                "s": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "i": {
                            "docs": {
                              "RoomController.html#repositories": {
                                "ref": "RoomController.html#repositories",
                                "tf": 702.9411764705883
                              },
                              "RoomController.html#init": {
                                "ref": "RoomController.html#init",
                                "tf": 4
                              },
                              "PluginController.html#addPlugin": {
                                "ref": "PluginController.html#addPlugin",
                                "tf": 3.8461538461538463
                              },
                              "PluginController.html#setPluginConfig": {
                                "ref": "PluginController.html#setPluginConfig",
                                "tf": 2.380952380952381
                              },
                              "RepositoryController.html": {
                                "ref": "RepositoryController.html",
                                "tf": 7.142857142857142
                              },
                              "RepositoryController.html#addRepository": {
                                "ref": "RepositoryController.html#addRepository",
                                "tf": 29.523809523809526
                              },
                              "RepositoryController.html#hasRepository": {
                                "ref": "RepositoryController.html#hasRepository",
                                "tf": 34.09090909090909
                              },
                              "RepositoryController.html#getRepositories": {
                                "ref": "RepositoryController.html#getRepositories",
                                "tf": 16.666666666666664
                              },
                              "RepositoryController.html#getRepositoryInformation": {
                                "ref": "RepositoryController.html#getRepositoryInformation",
                                "tf": 35
                              }
                            }
                          },
                          "y": {
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
                                          "docs": {
                                            "RoomController.html#repositories": {
                                              "ref": "RoomController.html#repositories",
                                              "tf": 50
                                            },
                                            "RepositoryController.html": {
                                              "ref": "RepositoryController.html",
                                              "tf": 1900
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
                                                  "a": {
                                                    "docs": {},
                                                    "d": {
                                                      "docs": {},
                                                      "d": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "p": {
                                                              "docs": {},
                                                              "o": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {},
                                                                      "o": {
                                                                        "docs": {},
                                                                        "r": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {
                                                                              "RepositoryController.html#addRepository": {
                                                                                "ref": "RepositoryController.html#addRepository",
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
                                                  },
                                                  "h": {
                                                    "docs": {},
                                                    "a": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "p": {
                                                              "docs": {},
                                                              "o": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {},
                                                                      "o": {
                                                                        "docs": {},
                                                                        "r": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {
                                                                              "RepositoryController.html#hasRepository": {
                                                                                "ref": "RepositoryController.html#hasRepository",
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
                                                  },
                                                  "g": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "p": {
                                                              "docs": {},
                                                              "o": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {},
                                                                      "o": {
                                                                        "docs": {},
                                                                        "r": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {
                                                                              "RepositoryController.html#getRepositories": {
                                                                                "ref": "RepositoryController.html#getRepositories",
                                                                                "tf": 1150
                                                                              }
                                                                            }
                                                                          },
                                                                          "y": {
                                                                            "docs": {},
                                                                            "i": {
                                                                              "docs": {},
                                                                              "n": {
                                                                                "docs": {},
                                                                                "f": {
                                                                                  "docs": {},
                                                                                  "o": {
                                                                                    "docs": {},
                                                                                    "r": {
                                                                                      "docs": {},
                                                                                      "m": {
                                                                                        "docs": {
                                                                                          "RepositoryController.html#getRepositoryInformation": {
                                                                                            "ref": "RepositoryController.html#getRepositoryInformation",
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
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            ".": {
                              "docs": {},
                              "j": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "n": {
                                      "docs": {
                                        "RepositoryController.html#getRepositoryInformation": {
                                          "ref": "RepositoryController.html#getRepositoryInformation",
                                          "tf": 5
                                        }
                                      }
                                    }
                                  }
                                }
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
                                      "RepositoryController.html#getRepositoryInformation": {
                                        "ref": "RepositoryController.html#getRepositoryInformation",
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
            },
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "PluginController.html#disablePlugin": {
                        "ref": "PluginController.html#disablePlugin",
                        "tf": 20
                      },
                      "PluginController.html#getPluginsThatDependOn": {
                        "ref": "PluginController.html#getPluginsThatDependOn",
                        "tf": 16.666666666666664
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
                  "Haxroomie.html": {
                    "ref": "Haxroomie.html",
                    "tf": 2
                  },
                  "Haxroomie.html#hasRoom": {
                    "ref": "Haxroomie.html#hasRoom",
                    "tf": 10
                  },
                  "RoomController.html#running": {
                    "ref": "RoomController.html#running",
                    "tf": 25
                  },
                  "RoomController.html#roomInfo": {
                    "ref": "RoomController.html#roomInfo",
                    "tf": 4.166666666666666
                  },
                  "RoomController.html#openRoomLock": {
                    "ref": "RoomController.html#openRoomLock",
                    "tf": 12.5
                  },
                  "RoomController.html#plugins": {
                    "ref": "RoomController.html#plugins",
                    "tf": 6.25
                  },
                  "RoomController.html#repositories": {
                    "ref": "RoomController.html#repositories",
                    "tf": 2.941176470588235
                  },
                  "RoomController.html#roles": {
                    "ref": "RoomController.html#roles",
                    "tf": 4.166666666666666
                  },
                  "RoomController.html#init": {
                    "ref": "RoomController.html#init",
                    "tf": 2
                  },
                  "RoomController.html#openRoom": {
                    "ref": "RoomController.html#openRoom",
                    "tf": 1.8518518518518516
                  },
                  "RoomController.html#closeRoom": {
                    "ref": "RoomController.html#closeRoom",
                    "tf": 5
                  },
                  "PluginController.html#hasPlugin": {
                    "ref": "PluginController.html#hasPlugin",
                    "tf": 8.333333333333332
                  },
                  "PluginController.html#setPluginConfig": {
                    "ref": "PluginController.html#setPluginConfig",
                    "tf": 2.380952380952381
                  },
                  "PluginController.html#getPluginConfig": {
                    "ref": "PluginController.html#getPluginConfig",
                    "tf": 4.545454545454546
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
                                  "tf": 55
                                },
                                "RoomController.html": {
                                  "ref": "RoomController.html",
                                  "tf": 1904.054054054054
                                },
                                "RoomController.html#init": {
                                  "ref": "RoomController.html#init",
                                  "tf": 2
                                }
                              },
                              "l": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "p": {
                                        "docs": {},
                                        "t": {
                                          "docs": {
                                            "Haxroomie.html#addRoom": {
                                              "ref": "Haxroomie.html#addRoom",
                                              "tf": 20
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "#": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "n": {
                                            "docs": {
                                              "RoomController.html#running": {
                                                "ref": "RoomController.html#running",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        },
                                        "o": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "f": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {
                                                        "RoomController.html#roomInfo": {
                                                          "ref": "RoomController.html#roomInfo",
                                                          "tf": 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "l": {
                                            "docs": {
                                              "RoomController.html#roles": {
                                                "ref": "RoomController.html#roles",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        },
                                        "e": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "s": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {
                                                            "RoomController.html#repositories": {
                                                              "ref": "RoomController.html#repositories",
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
                                        "h": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "d": {
                                                    "docs": {
                                                      "RoomController.html#hhmLoaded": {
                                                        "ref": "RoomController.html#hhmLoaded",
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
                                      "u": {
                                        "docs": {},
                                        "s": {
                                          "docs": {
                                            "RoomController.html#usable": {
                                              "ref": "RoomController.html#usable",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      },
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
                                                      },
                                                      "l": {
                                                        "docs": {},
                                                        "o": {
                                                          "docs": {},
                                                          "c": {
                                                            "docs": {},
                                                            "k": {
                                                              "docs": {
                                                                "RoomController.html#openRoomLock": {
                                                                  "ref": "RoomController.html#openRoomLock",
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
                                                    "RoomController.html#plugins": {
                                                      "ref": "RoomController.html#plugins",
                                                      "tf": 1150
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
                                          "i": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "RoomController.html#init": {
                                                  "ref": "RoomController.html#init",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "c": {
                                        "docs": {},
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
                                        },
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
                                        }
                                      },
                                      "e": {
                                        "docs": {},
                                        "v": {
                                          "docs": {
                                            "RoomController.html#eval": {
                                              "ref": "RoomController.html#eval",
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
                                "tf": 1.3513513513513513
                              },
                              "RoomController.html#callRoom": {
                                "ref": "RoomController.html#callRoom",
                                "tf": 8.333333333333332
                              },
                              "RoomController.html#eval": {
                                "ref": "RoomController.html#eval",
                                "tf": 3.125
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
                    "f": {
                      "docs": {},
                      "o": {
                        "docs": {
                          "RoomController.html#roomInfo": {
                            "ref": "RoomController.html#roomInfo",
                            "tf": 700
                          }
                        },
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
                                  "l": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "k": {
                                          "docs": {
                                            "RoomController.html#roomInfo": {
                                              "ref": "RoomController.html#roomInfo",
                                              "tf": 4.166666666666666
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
                                                                                              "tf": 3.125
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
            "l": {
              "docs": {},
              "e": {
                "docs": {
                  "RoomController.html#roles": {
                    "ref": "RoomController.html#roles",
                    "tf": 704.1666666666666
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
                                "RoomController.html#roles": {
                                  "ref": "RoomController.html#roles",
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
                "RoomController.html#running": {
                  "ref": "RoomController.html#running",
                  "tf": 725
                },
                "RoomController.html#roomInfo": {
                  "ref": "RoomController.html#roomInfo",
                  "tf": 8.333333333333332
                },
                "RoomController.html#plugins": {
                  "ref": "RoomController.html#plugins",
                  "tf": 6.25
                },
                "RoomController.html#roles": {
                  "ref": "RoomController.html#roles",
                  "tf": 4.166666666666666
                }
              }
            }
          }
        },
        "t": {
          "docs": {},
          "u": {
            "docs": {},
            "t": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "index.html": {
                        "ref": "index.html",
                        "tf": 35
                      },
                      "undefined": {
                        "tf": 110
                      },
                      "list_tutorial.html": {
                        "ref": "list_tutorial.html",
                        "tf": 635
                      }
                    }
                  }
                }
              }
            }
          },
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
                  "tf": 1.3513513513513513
                },
                "RoomController.html#openRoom": {
                  "ref": "RoomController.html#openRoom",
                  "tf": 1.8518518518518516
                },
                "RoomController.html#eval": {
                  "ref": "RoomController.html#eval",
                  "tf": 3.125
                }
              }
            }
          },
          "r": {
            "docs": {},
            "u": {
              "docs": {},
              "e": {
                "docs": {
                  "RoomController.html#openRoomLock": {
                    "ref": "RoomController.html#openRoomLock",
                    "tf": 12.5
                  },
                  "RepositoryController.html#addRepository": {
                    "ref": "RepositoryController.html#addRepository",
                    "tf": 2.380952380952381
                  }
                }
              }
            },
            "i": {
              "docs": {
                "PluginController.html#setPluginConfig": {
                  "ref": "PluginController.html#setPluginConfig",
                  "tf": 2.380952380952381
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
        "g": {
          "docs": {},
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
                    "RoomController.html#eval": {
                      "ref": "RoomController.html#eval",
                      "tf": 3.125
                    },
                    "PluginController.html#getPlugin": {
                      "ref": "PluginController.html#getPlugin",
                      "tf": 10
                    },
                    "PluginController.html#enablePlugin": {
                      "ref": "PluginController.html#enablePlugin",
                      "tf": 10
                    },
                    "PluginController.html#disablePlugin": {
                      "ref": "PluginController.html#disablePlugin",
                      "tf": 9.090909090909092
                    },
                    "PluginController.html#getPluginsThatDependOn": {
                      "ref": "PluginController.html#getPluginsThatDependOn",
                      "tf": 8.333333333333332
                    },
                    "PluginController.html#hasPlugin": {
                      "ref": "PluginController.html#hasPlugin",
                      "tf": 8.333333333333332
                    },
                    "PluginController.html#setPluginConfig": {
                      "ref": "PluginController.html#setPluginConfig",
                      "tf": 7.142857142857142
                    },
                    "PluginController.html#getPluginConfig": {
                      "ref": "PluginController.html#getPluginConfig",
                      "tf": 4.545454545454546
                    },
                    "RepositoryController.html#hasRepository": {
                      "ref": "RepositoryController.html#hasRepository",
                      "tf": 4.545454545454546
                    },
                    "RepositoryController.html#getRepositoryInformation": {
                      "ref": "RepositoryController.html#getRepositoryInformation",
                      "tf": 5
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
                "PluginController.html#getPluginsThatDependOn": {
                  "ref": "PluginController.html#getPluginsThatDependOn",
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
                },
                "e": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "i": {
                                  "docs": {
                                    "RepositoryController.html#getRepositories": {
                                      "ref": "RepositoryController.html#getRepositories",
                                      "tf": 683.3333333333334
                                    }
                                  }
                                },
                                "y": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "f": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "m": {
                                              "docs": {
                                                "RepositoryController.html#getRepositoryInformation": {
                                                  "ref": "RepositoryController.html#getRepositoryInformation",
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
                            "PluginController.html#getPlugins": {
                              "ref": "PluginController.html#getPlugins",
                              "tf": 683.3333333333334
                            },
                            "PluginController.html#getPlugin": {
                              "ref": "PluginController.html#getPlugin",
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
                                                      "PluginController.html#getPluginsThatDependOn": {
                                                        "ref": "PluginController.html#getPluginsThatDependOn",
                                                        "tf": 666.6666666666666
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
                                        "PluginController.html#getPluginConfig": {
                                          "ref": "PluginController.html#getPluginConfig",
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
        },
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
                      "undefined": {
                        "tf": 620
                      },
                      "RoomController.html#openRoom": {
                        "ref": "RoomController.html#openRoom",
                        "tf": 32.407407407407405
                      },
                      "PluginController.html#setPluginConfig": {
                        "ref": "PluginController.html#setPluginConfig",
                        "tf": 7.142857142857142
                      },
                      "PluginController.html#getPluginConfig": {
                        "ref": "PluginController.html#getPluginConfig",
                        "tf": 9.090909090909092
                      },
                      "RepositoryController.html#getRepositoryInformation": {
                        "ref": "RepositoryController.html#getRepositoryInformation",
                        "tf": 5
                      }
                    },
                    "u": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "RepositoryController.html#hasRepository": {
                            "ref": "RepositoryController.html#hasRepository",
                            "tf": 4.545454545454546
                          }
                        }
                      }
                    }
                  }
                }
              },
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
                          "tf": 1.3513513513513513
                        },
                        "RoomController.html#plugins": {
                          "ref": "RoomController.html#plugins",
                          "tf": 6.25
                        },
                        "RoomController.html#repositories": {
                          "ref": "RoomController.html#repositories",
                          "tf": 2.941176470588235
                        },
                        "RoomController.html#roles": {
                          "ref": "RoomController.html#roles",
                          "tf": 4.166666666666666
                        },
                        "RoomController.html#eval": {
                          "ref": "RoomController.html#eval",
                          "tf": 3.125
                        },
                        "PluginController.html": {
                          "ref": "PluginController.html",
                          "tf": 7.142857142857142
                        },
                        "RepositoryController.html": {
                          "ref": "RepositoryController.html",
                          "tf": 7.142857142857142
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
                        "RoomController.html#roomInfo": {
                          "ref": "RoomController.html#roomInfo",
                          "tf": 4.166666666666666
                        },
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
                  },
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "PluginController.html#addPlugin": {
                          "ref": "PluginController.html#addPlugin",
                          "tf": 3.8461538461538463
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "t": {
                  "docs": {},
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
                  "d": {
                    "docs": {
                      "RepositoryController.html#hasRepository": {
                        "ref": "RepositoryController.html#hasRepository",
                        "tf": 4.545454545454546
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
                        "tf": 1.3513513513513513
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "i": {
                "docs": {
                  "RoomController.html#roomInfo": {
                    "ref": "RoomController.html#roomInfo",
                    "tf": 4.166666666666666
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
                    "tf": 3.125
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "o": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "undefined": {
                        "tf": 625
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
              "docs": {
                "undefined": {
                  "tf": 625
                }
              }
            },
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
                    },
                    "PluginController.html": {
                      "ref": "PluginController.html",
                      "tf": 117.14285714285714
                    },
                    "RepositoryController.html": {
                      "ref": "RepositoryController.html",
                      "tf": 117.14285714285714
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
                    "RoomController.html#init": {
                      "ref": "RoomController.html#init",
                      "tf": 2
                    },
                    "RoomController.html#closeRoom": {
                      "ref": "RoomController.html#closeRoom",
                      "tf": 5
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
                    },
                    "PluginController.html#hasPlugin": {
                      "ref": "PluginController.html#hasPlugin",
                      "tf": 8.333333333333332
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
                "t": {
                  "docs": {
                    "Haxroomie.html": {
                      "ref": "Haxroomie.html",
                      "tf": 2
                    },
                    "RoomController.html": {
                      "ref": "RoomController.html",
                      "tf": 1.3513513513513513
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
                    "tf": 1.3513513513513513
                  },
                  "RoomController.html#init": {
                    "ref": "RoomController.html#init",
                    "tf": 2
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
                            "tf": 675
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "'": {
                "docs": {},
                "t": {
                  "docs": {
                    "RepositoryController.html#addRepository": {
                      "ref": "RepositoryController.html#addRepository",
                      "tf": 2.380952380952381
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
              "undefined": {
                "tf": 20
              },
              "Haxroomie.html#launchBrowser": {
                "ref": "Haxroomie.html#launchBrowser",
                "tf": 3.125
              },
              "Haxroomie.html#addRoom": {
                "ref": "Haxroomie.html#addRoom",
                "tf": 5
              },
              "RoomController.html#plugins": {
                "ref": "RoomController.html#plugins",
                "tf": 6.25
              },
              "RoomController.html#repositories": {
                "ref": "RoomController.html#repositories",
                "tf": 5.88235294117647
              },
              "RoomController.html#roles": {
                "ref": "RoomController.html#roles",
                "tf": 4.166666666666666
              },
              "RoomController.html#init": {
                "ref": "RoomController.html#init",
                "tf": 2
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
                    "RoomController.html#usable": {
                      "ref": "RoomController.html#usable",
                      "tf": 716.6666666666666
                    },
                    "RoomController.html#openRoom": {
                      "ref": "RoomController.html#openRoom",
                      "tf": 1.8518518518518516
                    }
                  }
                }
              }
            }
          },
          "b": {
            "docs": {},
            "u": {
              "docs": {},
              "n": {
                "docs": {},
                "t": {
                  "docs": {},
                  "u": {
                    "docs": {
                      "undefined": {
                        "tf": 25
                      }
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "d": {
              "docs": {},
              "o": {
                "docs": {
                  "RoomController.html#init": {
                    "ref": "RoomController.html#init",
                    "tf": 2
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "l": {
              "docs": {
                "RoomController.html#init": {
                  "ref": "RoomController.html#init",
                  "tf": 2
                },
                "RoomController.html#closeRoom": {
                  "ref": "RoomController.html#closeRoom",
                  "tf": 5
                }
              }
            }
          }
        },
        "f": {
          "docs": {},
          "i": {
            "docs": {},
            "l": {
              "docs": {},
              "e": {
                "docs": {
                  "undefined": {
                    "tf": 20
                  },
                  "RoomController.html#openRoom": {
                    "ref": "RoomController.html#openRoom",
                    "tf": 1.8518518518518516
                  },
                  "RepositoryController.html#getRepositoryInformation": {
                    "ref": "RepositoryController.html#getRepositoryInformation",
                    "tf": 5
                  }
                }
              }
            },
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
              },
              "e": {
                "docs": {
                  "RoomController.html": {
                    "ref": "RoomController.html",
                    "tf": 1.3513513513513513
                  }
                }
              }
            }
          },
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
                          "RoomController.html#init": {
                            "ref": "RoomController.html#init",
                            "tf": 110
                          },
                          "RoomController.html#openRoom": {
                            "ref": "RoomController.html#openRoom",
                            "tf": 110
                          },
                          "RoomController.html#callRoom": {
                            "ref": "RoomController.html#callRoom",
                            "tf": 118.33333333333333
                          },
                          "RoomController.html#eval": {
                            "ref": "RoomController.html#eval",
                            "tf": 110
                          },
                          "RoomController.html#closeRoom": {
                            "ref": "RoomController.html#closeRoom",
                            "tf": 110
                          },
                          "PluginController.html#getPlugins": {
                            "ref": "PluginController.html#getPlugins",
                            "tf": 110
                          },
                          "PluginController.html#getPlugin": {
                            "ref": "PluginController.html#getPlugin",
                            "tf": 110
                          },
                          "PluginController.html#enablePlugin": {
                            "ref": "PluginController.html#enablePlugin",
                            "tf": 110
                          },
                          "PluginController.html#disablePlugin": {
                            "ref": "PluginController.html#disablePlugin",
                            "tf": 110
                          },
                          "PluginController.html#getPluginsThatDependOn": {
                            "ref": "PluginController.html#getPluginsThatDependOn",
                            "tf": 110
                          },
                          "PluginController.html#hasPlugin": {
                            "ref": "PluginController.html#hasPlugin",
                            "tf": 110
                          },
                          "PluginController.html#addPlugin": {
                            "ref": "PluginController.html#addPlugin",
                            "tf": 110
                          },
                          "PluginController.html#removePlugin": {
                            "ref": "PluginController.html#removePlugin",
                            "tf": 110
                          },
                          "PluginController.html#setPluginConfig": {
                            "ref": "PluginController.html#setPluginConfig",
                            "tf": 110
                          },
                          "PluginController.html#getPluginConfig": {
                            "ref": "PluginController.html#getPluginConfig",
                            "tf": 110
                          },
                          "RepositoryController.html#addRepository": {
                            "ref": "RepositoryController.html#addRepository",
                            "tf": 110
                          },
                          "RepositoryController.html#hasRepository": {
                            "ref": "RepositoryController.html#hasRepository",
                            "tf": 110
                          },
                          "RepositoryController.html#getRepositories": {
                            "ref": "RepositoryController.html#getRepositories",
                            "tf": 110
                          },
                          "RepositoryController.html#getRepositoryInformation": {
                            "ref": "RepositoryController.html#getRepositoryInformation",
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
          "a": {
            "docs": {},
            "c": {
              "docs": {},
              "t": {
                "docs": {},
                "o": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "i": {
                      "docs": {
                        "RoomController.html": {
                          "ref": "RoomController.html",
                          "tf": 1.3513513513513513
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {
              "RoomController.html#callRoom": {
                "ref": "RoomController.html#callRoom",
                "tf": 25
              }
            }
          },
          "o": {
            "docs": {},
            "u": {
              "docs": {},
              "n": {
                "docs": {},
                "d": {
                  "docs": {
                    "RepositoryController.html#addRepository": {
                      "ref": "RepositoryController.html#addRepository",
                      "tf": 2.380952380952381
                    }
                  }
                }
              }
            }
          }
        },
        "a": {
          "docs": {},
          "v": {
            "docs": {},
            "a": {
              "docs": {},
              "i": {
                "docs": {},
                "l": {
                  "docs": {
                    "list_tutorial.html": {
                      "ref": "list_tutorial.html",
                      "tf": 35
                    },
                    "Haxroomie.html#getRooms": {
                      "ref": "Haxroomie.html#getRooms",
                      "tf": 12.5
                    },
                    "PluginController.html#addPlugin": {
                      "ref": "PluginController.html#addPlugin",
                      "tf": 3.8461538461538463
                    },
                    "PluginController.html#setPluginConfig": {
                      "ref": "PluginController.html#setPluginConfig",
                      "tf": 2.380952380952381
                    },
                    "RepositoryController.html#getRepositories": {
                      "ref": "RepositoryController.html#getRepositories",
                      "tf": 16.666666666666664
                    }
                  }
                }
              }
            }
          },
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
                    "PluginController.html#disablePlugin": {
                      "ref": "PluginController.html#disablePlugin",
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
                              },
                              "e": {
                                "docs": {},
                                "p": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "y": {
                                                "docs": {},
                                                "&": {
                                                  "docs": {},
                                                  "g": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {
                                                        "RepositoryController.html#getRepositories": {
                                                          "ref": "RepositoryController.html#getRepositories",
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
            },
            "g": {
              "docs": {
                "RoomController.html#eval": {
                  "ref": "RoomController.html#eval",
                  "tf": 20
                }
              }
            }
          },
          "d": {
            "docs": {
              "Haxroomie.html#getFirstRoom": {
                "ref": "Haxroomie.html#getFirstRoom",
                "tf": 12.5
              },
              "RepositoryController.html#addRepository": {
                "ref": "RepositoryController.html#addRepository",
                "tf": 4.761904761904762
              }
            },
            "d": {
              "docs": {
                "Haxroomie.html#addRoom": {
                  "ref": "Haxroomie.html#addRoom",
                  "tf": 5
                },
                "PluginController.html#addPlugin": {
                  "ref": "PluginController.html#addPlugin",
                  "tf": 3.8461538461538463
                },
                "RepositoryController.html#addRepository": {
                  "ref": "RepositoryController.html#addRepository",
                  "tf": 2.380952380952381
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
                          "tf": 670
                        }
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "i": {
                                  "docs": {
                                    "RepositoryController.html#addRepository": {
                                      "ref": "RepositoryController.html#addRepository",
                                      "tf": 670
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
                          "docs": {
                            "PluginController.html#addPlugin": {
                              "ref": "PluginController.html#addPlugin",
                              "tf": 670
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
            "i": {
              "docs": {
                "RoomController.html": {
                  "ref": "RoomController.html",
                  "tf": 1.3513513513513513
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
                      "RepositoryController.html#addRepository": {
                        "ref": "RepositoryController.html#addRepository",
                        "tf": 22.38095238095238
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
                        "tf": 3.125
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "r": {
              "docs": {},
              "e": {
                "docs": {},
                "a": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "i": {
                      "docs": {
                        "RepositoryController.html#hasRepository": {
                          "ref": "RepositoryController.html#hasRepository",
                          "tf": 4.545454545454546
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
                  "list_tutorial.html": {
                    "ref": "list_tutorial.html",
                    "tf": 110
                  },
                  "list_class.html": {
                    "ref": "list_class.html",
                    "tf": 110
                  },
                  "list_module.html": {
                    "ref": "list_module.html",
                    "tf": 110
                  },
                  "PluginController.html#getPluginsThatDependOn": {
                    "ref": "PluginController.html#getPluginsThatDependOn",
                    "tf": 8.333333333333332
                  }
                },
                ":": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "i": {
                              "docs": {
                                "list_tutorial.html": {
                                  "ref": "list_tutorial.html",
                                  "tf": 1300
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
                },
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 1.3513513513513513
                      }
                    }
                  }
                }
              }
            },
            "b": {
              "docs": {},
              "r": {
                "docs": {},
                "a": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "i": {
                      "docs": {
                        "RoomController.html#repositories": {
                          "ref": "RoomController.html#repositories",
                          "tf": 2.941176470588235
                        },
                        "RoomController.html#init": {
                          "ref": "RoomController.html#init",
                          "tf": 2
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
                                  "tf": 20
                                },
                                "RoomController.html#init": {
                                  "ref": "RoomController.html#init",
                                  "tf": 33.33333333333333
                                },
                                "RoomController.html#openRoom": {
                                  "ref": "RoomController.html#openRoom",
                                  "tf": 25
                                },
                                "RoomController.html#callRoom": {
                                  "ref": "RoomController.html#callRoom",
                                  "tf": 25
                                },
                                "RoomController.html#eval": {
                                  "ref": "RoomController.html#eval",
                                  "tf": 20
                                },
                                "RoomController.html#closeRoom": {
                                  "ref": "RoomController.html#closeRoom",
                                  "tf": 50
                                },
                                "PluginController.html#getPlugins": {
                                  "ref": "PluginController.html#getPlugins",
                                  "tf": 33.33333333333333
                                },
                                "PluginController.html#getPlugin": {
                                  "ref": "PluginController.html#getPlugin",
                                  "tf": 25
                                },
                                "PluginController.html#enablePlugin": {
                                  "ref": "PluginController.html#enablePlugin",
                                  "tf": 25
                                },
                                "PluginController.html#disablePlugin": {
                                  "ref": "PluginController.html#disablePlugin",
                                  "tf": 20
                                },
                                "PluginController.html#getPluginsThatDependOn": {
                                  "ref": "PluginController.html#getPluginsThatDependOn",
                                  "tf": 16.666666666666664
                                },
                                "PluginController.html#hasPlugin": {
                                  "ref": "PluginController.html#hasPlugin",
                                  "tf": 25
                                },
                                "PluginController.html#addPlugin": {
                                  "ref": "PluginController.html#addPlugin",
                                  "tf": 20
                                },
                                "PluginController.html#removePlugin": {
                                  "ref": "PluginController.html#removePlugin",
                                  "tf": 20
                                },
                                "PluginController.html#setPluginConfig": {
                                  "ref": "PluginController.html#setPluginConfig",
                                  "tf": 25
                                },
                                "PluginController.html#getPluginConfig": {
                                  "ref": "PluginController.html#getPluginConfig",
                                  "tf": 25
                                },
                                "RepositoryController.html#addRepository": {
                                  "ref": "RepositoryController.html#addRepository",
                                  "tf": 20
                                },
                                "RepositoryController.html#hasRepository": {
                                  "ref": "RepositoryController.html#hasRepository",
                                  "tf": 25
                                },
                                "RepositoryController.html#getRepositories": {
                                  "ref": "RepositoryController.html#getRepositories",
                                  "tf": 33.33333333333333
                                },
                                "RepositoryController.html#getRepositoryInformation": {
                                  "ref": "RepositoryController.html#getRepositoryInformation",
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
          },
          "o": {
            "docs": {},
            "a": {
              "docs": {},
              "d": {
                "docs": {
                  "RoomController.html#hhmLoaded": {
                    "ref": "RoomController.html#hhmLoaded",
                    "tf": 12.5
                  },
                  "RoomController.html#repositories": {
                    "ref": "RoomController.html#repositories",
                    "tf": 5.88235294117647
                  },
                  "RoomController.html#roles": {
                    "ref": "RoomController.html#roles",
                    "tf": 4.166666666666666
                  },
                  "RoomController.html#init": {
                    "ref": "RoomController.html#init",
                    "tf": 2
                  },
                  "PluginController.html#getPlugins": {
                    "ref": "PluginController.html#getPlugins",
                    "tf": 16.666666666666664
                  },
                  "PluginController.html#hasPlugin": {
                    "ref": "PluginController.html#hasPlugin",
                    "tf": 8.333333333333332
                  },
                  "PluginController.html#addPlugin": {
                    "ref": "PluginController.html#addPlugin",
                    "tf": 7.6923076923076925
                  },
                  "PluginController.html#setPluginConfig": {
                    "ref": "PluginController.html#setPluginConfig",
                    "tf": 7.142857142857142
                  },
                  "PluginController.html#getPluginConfig": {
                    "ref": "PluginController.html#getPluginConfig",
                    "tf": 4.545454545454546
                  },
                  "RepositoryController.html#addRepository": {
                    "ref": "RepositoryController.html#addRepository",
                    "tf": 2.380952380952381
                  },
                  "RepositoryController.html#getRepositoryInformation": {
                    "ref": "RepositoryController.html#getRepositoryInformation",
                    "tf": 5
                  }
                }
              }
            },
            "w": {
              "docs": {},
              "e": {
                "docs": {},
                "s": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "RepositoryController.html#addRepository": {
                        "ref": "RepositoryController.html#addRepository",
                        "tf": 2.380952380952381
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
                      "tf": 110
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
                      "tf": 1.3513513513513513
                    },
                    "RoomController.html#hhmLoaded": {
                      "ref": "RoomController.html#hhmLoaded",
                      "tf": 12.5
                    },
                    "RoomController.html#init": {
                      "ref": "RoomController.html#init",
                      "tf": 2
                    },
                    "PluginController.html": {
                      "ref": "PluginController.html",
                      "tf": 7.142857142857142
                    },
                    "RepositoryController.html": {
                      "ref": "RepositoryController.html",
                      "tf": 7.142857142857142
                    }
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
                        "tf": 4.054054054054054
                      },
                      "RoomController.html#repositories": {
                        "ref": "RoomController.html#repositories",
                        "tf": 2.941176470588235
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "b": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "RoomController.html#running": {
                        "ref": "RoomController.html#running",
                        "tf": 110
                      },
                      "RoomController.html#hhmLoaded": {
                        "ref": "RoomController.html#hhmLoaded",
                        "tf": 110
                      },
                      "RoomController.html#usable": {
                        "ref": "RoomController.html#usable",
                        "tf": 110
                      },
                      "RoomController.html#roomInfo": {
                        "ref": "RoomController.html#roomInfo",
                        "tf": 110
                      },
                      "RoomController.html#openRoomLock": {
                        "ref": "RoomController.html#openRoomLock",
                        "tf": 110
                      },
                      "RoomController.html#plugins": {
                        "ref": "RoomController.html#plugins",
                        "tf": 110
                      },
                      "RoomController.html#repositories": {
                        "ref": "RoomController.html#repositories",
                        "tf": 110
                      },
                      "RoomController.html#roles": {
                        "ref": "RoomController.html#roles",
                        "tf": 110
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
                    },
                    "RoomController.html#init": {
                      "ref": "RoomController.html#init",
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
                          "tf": 1.3513513513513513
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
                          "tf": 3.125
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
                        },
                        "RoomController.html#running": {
                          "ref": "RoomController.html#running",
                          "tf": 50
                        },
                        "RoomController.html#hhmLoaded": {
                          "ref": "RoomController.html#hhmLoaded",
                          "tf": 50
                        },
                        "RoomController.html#usable": {
                          "ref": "RoomController.html#usable",
                          "tf": 50
                        },
                        "RoomController.html#openRoomLock": {
                          "ref": "RoomController.html#openRoomLock",
                          "tf": 50
                        },
                        "RepositoryController.html#hasRepository": {
                          "ref": "RepositoryController.html#hasRepository",
                          "tf": 25
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
                    "tf": 2.7027027027027026
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "e": {
              "docs": {},
              "n": {
                "docs": {},
                "t": {
                  "docs": {
                    "RoomController.html": {
                      "ref": "RoomController.html",
                      "tf": 1.3513513513513513
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "l": {
                "docs": {
                  "RoomController.html#eval": {
                    "ref": "RoomController.html#eval",
                    "tf": 670
                  }
                },
                "u": {
                  "docs": {
                    "RoomController.html#eval": {
                      "ref": "RoomController.html#eval",
                      "tf": 3.125
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
                "RoomController.html#roomInfo": {
                  "ref": "RoomController.html#roomInfo",
                  "tf": 4.166666666666666
                },
                "RoomController.html#eval": {
                  "ref": "RoomController.html#eval",
                  "tf": 3.125
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
                    "RoomController.html#roles": {
                      "ref": "RoomController.html#roles",
                      "tf": 4.166666666666666
                    },
                    "RoomController.html#init": {
                      "ref": "RoomController.html#init",
                      "tf": 2
                    },
                    "PluginController.html#enablePlugin": {
                      "ref": "PluginController.html#enablePlugin",
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
                                  "PluginController.html#enablePlugin": {
                                    "ref": "PluginController.html#enablePlugin",
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
          },
          "q": {
            "docs": {},
            "u": {
              "docs": {},
              "a": {
                "docs": {},
                "l": {
                  "docs": {
                    "RepositoryController.html#hasRepository": {
                      "ref": "RepositoryController.html#hasRepository",
                      "tf": 4.545454545454546
                    }
                  }
                }
              }
            }
          },
          "x": {
            "docs": {},
            "i": {
              "docs": {},
              "s": {
                "docs": {},
                "t": {
                  "docs": {
                    "RepositoryController.html#hasRepository": {
                      "ref": "RepositoryController.html#hasRepository",
                      "tf": 4.545454545454546
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
                "tf": 1.3513513513513513
              }
            }
          },
          "p": {
            "docs": {},
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 1.3513513513513513
                      },
                      "RoomController.html#init": {
                        "ref": "RoomController.html#init",
                        "tf": 33.33333333333333
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "n": {
                "docs": {
                  "RoomController.html#openRoomLock": {
                    "ref": "RoomController.html#openRoomLock",
                    "tf": 12.5
                  },
                  "RoomController.html#repositories": {
                    "ref": "RoomController.html#repositories",
                    "tf": 2.941176470588235
                  },
                  "RoomController.html#init": {
                    "ref": "RoomController.html#init",
                    "tf": 2
                  },
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
                          "RoomController.html#repositories": {
                            "ref": "RoomController.html#repositories",
                            "tf": 2.941176470588235
                          },
                          "RoomController.html#openRoom": {
                            "ref": "RoomController.html#openRoom",
                            "tf": 675
                          }
                        },
                        "l": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "c": {
                              "docs": {},
                              "k": {
                                "docs": {
                                  "RoomController.html#openRoomLock": {
                                    "ref": "RoomController.html#openRoomLock",
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
                      "RoomController.html#roomInfo": {
                        "ref": "RoomController.html#roomInfo",
                        "tf": 54.166666666666664
                      },
                      "RoomController.html#plugins": {
                        "ref": "RoomController.html#plugins",
                        "tf": 6.25
                      },
                      "RoomController.html#repositories": {
                        "ref": "RoomController.html#repositories",
                        "tf": 2.941176470588235
                      },
                      "RoomController.html#roles": {
                        "ref": "RoomController.html#roles",
                        "tf": 4.166666666666666
                      },
                      "RoomController.html#init": {
                        "ref": "RoomController.html#init",
                        "tf": 2
                      },
                      "RoomController.html#openRoom": {
                        "ref": "RoomController.html#openRoom",
                        "tf": 30.555555555555557
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "i": {
              "docs": {},
              "g": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "RoomController.html#roomInfo": {
                        "ref": "RoomController.html#roomInfo",
                        "tf": 4.166666666666666
                      }
                    }
                  }
                }
              }
            },
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "PluginController.html#disablePlugin": {
                      "ref": "PluginController.html#disablePlugin",
                      "tf": 4.545454545454546
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "t": {
              "docs": {
                "RoomController.html#closeRoom": {
                  "ref": "RoomController.html#closeRoom",
                  "tf": 5
                }
              }
            }
          },
          "t": {
            "docs": {},
            "h": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "w": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "s": {
                        "docs": {
                          "RepositoryController.html#addRepository": {
                            "ref": "RepositoryController.html#addRepository",
                            "tf": 2.380952380952381
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
          },
          "t": {
            "docs": {},
            "r": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {},
                  "g": {
                    "docs": {
                      "Haxroomie.html#addRoom": {
                        "ref": "Haxroomie.html#addRoom",
                        "tf": 5
                      },
                      "PluginController.html#addPlugin": {
                        "ref": "PluginController.html#addPlugin",
                        "tf": 3.8461538461538463
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "l": {
                "docs": {},
                "l": {
                  "docs": {
                    "RoomController.html#usable": {
                      "ref": "RoomController.html#usable",
                      "tf": 16.666666666666664
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "v": {
              "docs": {},
              "/": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "RoomController.html#roles": {
                          "ref": "RoomController.html#roles",
                          "tf": 4.166666666666666
                        }
                      }
                    }
                  }
                }
              }
            },
            "f": {
              "docs": {},
              "e": {
                "docs": {
                  "PluginController.html#removePlugin": {
                    "ref": "PluginController.html#removePlugin",
                    "tf": 20
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "RepositoryController.html#hasRepository": {
                    "ref": "RepositoryController.html#hasRepository",
                    "tf": 4.545454545454546
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "t": {
              "docs": {
                "PluginController.html#setPluginConfig": {
                  "ref": "PluginController.html#setPluginConfig",
                  "tf": 4.761904761904762
                },
                "RepositoryController.html#addRepository": {
                  "ref": "RepositoryController.html#addRepository",
                  "tf": 2.380952380952381
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
                                        "PluginController.html#setPluginConfig": {
                                          "ref": "PluginController.html#setPluginConfig",
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
                      },
                      "RoomController.html#eval": {
                        "ref": "RoomController.html#eval",
                        "tf": 3.125
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
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 1.3513513513513513
                      }
                    },
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
                                  "n": {
                                    "docs": {},
                                    "y": {
                                      "docs": {},
                                      "&": {
                                        "docs": {},
                                        "g": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "RoomController.html#callRoom": {
                                                "ref": "RoomController.html#callRoom",
                                                "tf": 25
                                              }
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
                                                                                        "PluginController.html#getPlugins": {
                                                                                          "ref": "PluginController.html#getPlugins",
                                                                                          "tf": 33.33333333333333
                                                                                        },
                                                                                        "PluginController.html#getPluginsThatDependOn": {
                                                                                          "ref": "PluginController.html#getPluginsThatDependOn",
                                                                                          "tf": 16.666666666666664
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
                                                    "n": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "m": {
                                                          "docs": {},
                                                          "b": {
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
                                                                      "docs": {},
                                                                      ";": {
                                                                        "docs": {},
                                                                        "&": {
                                                                          "docs": {},
                                                                          "g": {
                                                                            "docs": {},
                                                                            "t": {
                                                                              "docs": {
                                                                                "PluginController.html#disablePlugin": {
                                                                                  "ref": "PluginController.html#disablePlugin",
                                                                                  "tf": 20
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
                                "s": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "z": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "b": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "&": {
                                                          "docs": {},
                                                          "g": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {
                                                                "RoomController.html#eval": {
                                                                  "ref": "RoomController.html#eval",
                                                                  "tf": 20
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
                                "?": {
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
                                                            "docs": {
                                                              "PluginController.html#getPlugin": {
                                                                "ref": "PluginController.html#getPlugin",
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
                                                      "PluginController.html#enablePlugin": {
                                                        "ref": "PluginController.html#enablePlugin",
                                                        "tf": 25
                                                      },
                                                      "PluginController.html#hasPlugin": {
                                                        "ref": "PluginController.html#hasPlugin",
                                                        "tf": 25
                                                      },
                                                      "PluginController.html#removePlugin": {
                                                        "ref": "PluginController.html#removePlugin",
                                                        "tf": 20
                                                      },
                                                      "RepositoryController.html#addRepository": {
                                                        "ref": "RepositoryController.html#addRepository",
                                                        "tf": 20
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
                                "n": {
                                  "docs": {},
                                  "u": {
                                    "docs": {},
                                    "m": {
                                      "docs": {},
                                      "b": {
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
                                                    "PluginController.html#addPlugin": {
                                                      "ref": "PluginController.html#addPlugin",
                                                      "tf": 20
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
                                            "docs": {},
                                            "&": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "PluginController.html#getPluginConfig": {
                                                      "ref": "PluginController.html#getPluginConfig",
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
              },
              "v": {
                "docs": {},
                "i": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "RoomController.html": {
                        "ref": "RoomController.html",
                        "tf": 2.7027027027027026
                      }
                    }
                  }
                }
              },
              "c": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "s": {
                      "docs": {
                        "RoomController.html#openRoomLock": {
                          "ref": "RoomController.html#openRoomLock",
                          "tf": 12.5
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
              }
            },
            "i": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "RepositoryController.html#addRepository": {
                            "ref": "RepositoryController.html#addRepository",
                            "tf": 4.761904761904762
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
            "u": {
              "docs": {},
              "g": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "RoomController.html#plugins": {
                        "ref": "RoomController.html#plugins",
                        "tf": 706.25
                      },
                      "RoomController.html#roles": {
                        "ref": "RoomController.html#roles",
                        "tf": 4.166666666666666
                      },
                      "PluginController.html": {
                        "ref": "PluginController.html",
                        "tf": 7.142857142857142
                      },
                      "PluginController.html#getPlugins": {
                        "ref": "PluginController.html#getPlugins",
                        "tf": 16.666666666666664
                      },
                      "PluginController.html#getPlugin": {
                        "ref": "PluginController.html#getPlugin",
                        "tf": 10
                      },
                      "PluginController.html#enablePlugin": {
                        "ref": "PluginController.html#enablePlugin",
                        "tf": 10
                      },
                      "PluginController.html#disablePlugin": {
                        "ref": "PluginController.html#disablePlugin",
                        "tf": 9.090909090909092
                      },
                      "PluginController.html#getPluginsThatDependOn": {
                        "ref": "PluginController.html#getPluginsThatDependOn",
                        "tf": 16.666666666666664
                      },
                      "PluginController.html#hasPlugin": {
                        "ref": "PluginController.html#hasPlugin",
                        "tf": 8.333333333333332
                      },
                      "PluginController.html#addPlugin": {
                        "ref": "PluginController.html#addPlugin",
                        "tf": 39.23076923076923
                      },
                      "PluginController.html#removePlugin": {
                        "ref": "PluginController.html#removePlugin",
                        "tf": 25
                      },
                      "PluginController.html#setPluginConfig": {
                        "ref": "PluginController.html#setPluginConfig",
                        "tf": 9.523809523809524
                      },
                      "PluginController.html#getPluginConfig": {
                        "ref": "PluginController.html#getPluginConfig",
                        "tf": 13.636363636363635
                      },
                      "RepositoryController.html#addRepository": {
                        "ref": "RepositoryController.html#addRepository",
                        "tf": 2.380952380952381
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
                                    "RoomController.html#plugins": {
                                      "ref": "RoomController.html#plugins",
                                      "tf": 50
                                    },
                                    "PluginController.html": {
                                      "ref": "PluginController.html",
                                      "tf": 1900
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
                                                              "PluginController.html#getPlugins": {
                                                                "ref": "PluginController.html#getPlugins",
                                                                "tf": 1150
                                                              },
                                                              "PluginController.html#getPlugin": {
                                                                "ref": "PluginController.html#getPlugin",
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
                                                                                        "PluginController.html#getPluginsThatDependOn": {
                                                                                          "ref": "PluginController.html#getPluginsThatDependOn",
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
                                                            },
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
                                                                          "PluginController.html#getPluginConfig": {
                                                                            "ref": "PluginController.html#getPluginConfig",
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
                                                                    "PluginController.html#enablePlugin": {
                                                                      "ref": "PluginController.html#enablePlugin",
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
                                                                      "PluginController.html#disablePlugin": {
                                                                        "ref": "PluginController.html#disablePlugin",
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
                                          },
                                          "h": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "s": {
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
                                                              "PluginController.html#hasPlugin": {
                                                                "ref": "PluginController.html#hasPlugin",
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
                                          },
                                          "a": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "d": {
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
                                                              "PluginController.html#addPlugin": {
                                                                "ref": "PluginController.html#addPlugin",
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
                                                                    "PluginController.html#removePlugin": {
                                                                      "ref": "PluginController.html#removePlugin",
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
                                          "s": {
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
                                                                          "PluginController.html#setPluginConfig": {
                                                                            "ref": "PluginController.html#setPluginConfig",
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
                          },
                          "f": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "g": {
                                "docs": {
                                  "PluginController.html#addPlugin": {
                                    "ref": "PluginController.html#addPlugin",
                                    "tf": 20
                                  },
                                  "PluginController.html#setPluginConfig": {
                                    "ref": "PluginController.html#setPluginConfig",
                                    "tf": 25
                                  }
                                }
                              }
                            }
                          }
                        }
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
                              "PluginController.html#getPlugin": {
                                "ref": "PluginController.html#getPlugin",
                                "tf": 10
                              }
                            }
                          }
                        }
                      }
                    },
                    "n": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "m": {
                          "docs": {
                            "PluginController.html#removePlugin": {
                              "ref": "PluginController.html#removePlugin",
                              "tf": 20
                            },
                            "PluginController.html#setPluginConfig": {
                              "ref": "PluginController.html#setPluginConfig",
                              "tf": 27.38095238095238
                            },
                            "PluginController.html#getPluginConfig": {
                              "ref": "PluginController.html#getPluginConfig",
                              "tf": 29.545454545454547
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
            "g": {
              "docs": {},
              "e": {
                "docs": {
                  "RoomController.html#init": {
                    "ref": "RoomController.html#init",
                    "tf": 2
                  },
                  "RoomController.html#closeRoom": {
                    "ref": "RoomController.html#closeRoom",
                    "tf": 5
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
                          "u": {
                            "docs": {
                              "RoomController.html#eval": {
                                "ref": "RoomController.html#eval",
                                "tf": 3.125
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
                  "u": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "RoomController.html#eval": {
                              "ref": "RoomController.html#eval",
                              "tf": 20
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
        "n": {
          "docs": {},
          "e": {
            "docs": {},
            "w": {
              "docs": {
                "Haxroomie.html#addRoom": {
                  "ref": "Haxroomie.html#addRoom",
                  "tf": 10
                },
                "RoomController.html": {
                  "ref": "RoomController.html",
                  "tf": 1.3513513513513513
                },
                "PluginController.html#addPlugin": {
                  "ref": "PluginController.html#addPlugin",
                  "tf": 3.8461538461538463
                },
                "RepositoryController.html#addRepository": {
                  "ref": "RepositoryController.html#addRepository",
                  "tf": 2.380952380952381
                }
              }
            }
          },
          "u": {
            "docs": {},
            "m": {
              "docs": {},
              "b": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Haxroomie.html#addRoom": {
                        "ref": "Haxroomie.html#addRoom",
                        "tf": 5
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "RoomController.html#roomInfo": {
                    "ref": "RoomController.html#roomInfo",
                    "tf": 4.166666666666666
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "v": {
              "docs": {},
              "i": {
                "docs": {},
                "g": {
                  "docs": {
                    "RoomController.html#init": {
                      "ref": "RoomController.html#init",
                      "tf": 2
                    },
                    "RoomController.html#closeRoom": {
                      "ref": "RoomController.html#closeRoom",
                      "tf": 5
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "PluginController.html#getPlugin": {
                    "ref": "PluginController.html#getPlugin",
                    "tf": 35
                  },
                  "PluginController.html#enablePlugin": {
                    "ref": "PluginController.html#enablePlugin",
                    "tf": 35
                  },
                  "PluginController.html#disablePlugin": {
                    "ref": "PluginController.html#disablePlugin",
                    "tf": 29.090909090909093
                  },
                  "PluginController.html#getPluginsThatDependOn": {
                    "ref": "PluginController.html#getPluginsThatDependOn",
                    "tf": 16.666666666666664
                  },
                  "PluginController.html#hasPlugin": {
                    "ref": "PluginController.html#hasPlugin",
                    "tf": 33.33333333333333
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "t": {
              "docs": {},
              "e": {
                "docs": {
                  "RoomController.html#init": {
                    "ref": "RoomController.html#init",
                    "tf": 2
                  }
                }
              }
            }
          }
        },
        "w": {
          "docs": {},
          "a": {
            "docs": {},
            "y": {
              "docs": {
                "RoomController.html": {
                  "ref": "RoomController.html",
                  "tf": 1.3513513513513513
                }
              }
            },
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
          },
          "i": {
            "docs": {},
            "t": {
              "docs": {},
              "h": {
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
              }
            }
          },
          "r": {
            "docs": {},
            "a": {
              "docs": {},
              "p": {
                "docs": {},
                "p": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "RoomController.html#eval": {
                          "ref": "RoomController.html#eval",
                          "tf": 3.125
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
            "e": {
              "docs": {},
              "t": {
                "docs": {},
                "h": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "RepositoryController.html#hasRepository": {
                          "ref": "RepositoryController.html#hasRepository",
                          "tf": 4.545454545454546
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
      "length": 542
    },
    "corpusTokens": [
      "access",
      "ad",
      "add",
      "addplugin",
      "addrepositori",
      "addroom",
      "alreadi",
      "anyth",
      "api",
      "append",
      "arg",
      "array",
      "array.&lt;repository&gt",
      "array.&lt;roomcontroller&gt",
      "avail",
      "befor",
      "boolean",
      "browser",
      "call",
      "callroom",
      "can't",
      "check",
      "chrome",
      "class",
      "cli",
      "close",
      "closebrows",
      "closeroom",
      "code",
      "commun",
      "config",
      "configur",
      "consid",
      "constructor",
      "contain",
      "content",
      "context",
      "control",
      "copi",
      "creat",
      "custom",
      "data",
      "debug",
      "delet",
      "depend",
      "disabl",
      "disableplugin",
      "document",
      "e.g",
      "each",
      "enabl",
      "enableplugin",
      "equal",
      "eval",
      "evalu",
      "event",
      "exist",
      "factori",
      "file",
      "fire",
      "first",
      "fn",
      "found",
      "function",
      "get",
      "getfirstroom",
      "getplugin",
      "getpluginconfig",
      "getpluginsthatdependon",
      "getrepositori",
      "getrepositoryinform",
      "getroom",
      "given",
      "global",
      "hasplugin",
      "hasrepositori",
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
      "hhmload",
      "highest",
      "hrconfig",
      "i.",
      "id",
      "includedis",
      "index",
      "inform",
      "init",
      "initi",
      "instac",
      "instal",
      "instanc",
      "interfac",
      "launch",
      "launchbrows",
      "librari",
      "list",
      "list:class",
      "list:modul",
      "list:tutori",
      "listen",
      "load",
      "lowest",
      "lt;async&gt",
      "manag",
      "member",
      "method",
      "modul",
      "module:haxroomi",
      "name",
      "navig",
      "new",
      "note",
      "null",
      "number",
      "object",
      "on",
      "open",
      "openroom",
      "openroomlock",
      "option",
      "order",
      "origin",
      "otherwis",
      "out",
      "page",
      "page.evalu",
      "pagefunct",
      "plugin",
      "pluginconfig",
      "plugincontrol",
      "plugincontroller#addplugin",
      "plugincontroller#disableplugin",
      "plugincontroller#enableplugin",
      "plugincontroller#getplugin",
      "plugincontroller#getpluginconfig",
      "plugincontroller#getpluginsthatdependon",
      "plugincontroller#hasplugin",
      "plugincontroller#removeplugin",
      "plugincontroller#setpluginconfig",
      "plugindata",
      "pluginnam",
      "port",
      "possibl",
      "prioriti",
      "process",
      "promis",
      "promise.&lt;?plugindata&gt",
      "promise.&lt;any&gt",
      "promise.&lt;array.&lt;number&gt;&gt",
      "promise.&lt;array.&lt;plugindata&gt;&gt",
      "promise.&lt;boolean&gt",
      "promise.&lt;number&gt",
      "promise.&lt;object&gt",
      "promise.&lt;serializable&gt",
      "properti",
      "provid",
      "puppet",
      "readi",
      "readm",
      "recurs",
      "remot",
      "remov",
      "removeplugin",
      "removeroom",
      "repositori",
      "repository.json",
      "repositorycontrol",
      "repositorycontroller#addrepositori",
      "repositorycontroller#getrepositori",
      "repositorycontroller#getrepositoryinform",
      "repositorycontroller#hasrepositori",
      "repositorydata",
      "requir",
      "retriev",
      "return",
      "role",
      "rolecontrol",
      "room",
      "room.eval('hhm.manager.room.getplayerlist",
      "roomcontrol",
      "roomcontroller#callroom",
      "roomcontroller#closeroom",
      "roomcontroller#ev",
      "roomcontroller#hhmload",
      "roomcontroller#init",
      "roomcontroller#openroom",
      "roomcontroller#openroomlock",
      "roomcontroller#plugin",
      "roomcontroller#repositori",
      "roomcontroller#rol",
      "roomcontroller#roominfo",
      "roomcontroller#run",
      "roomcontroller#us",
      "roomcontrolleropt",
      "roominfo",
      "roominfo.roomlink",
      "roomobject",
      "run",
      "safe",
      "same",
      "sav/rol",
      "set",
      "setpluginconfig",
      "spawn",
      "still",
      "string",
      "tab",
      "top",
      "tri",
      "true",
      "tutori",
      "ubuntu",
      "undo",
      "url",
      "us",
      "usabl",
      "want",
      "way",
      "whether",
      "within",
      "wrapper"
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
      "summary": "Documentation and tutorials.",
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
    "undefined": {
      "kind": "tutorial",
      "title": "Install haxroomie-cli to Ubuntu",
      "longname": "haxroomie-cli-install",
      "name": "haxroomie-cli-install",
      "tags": "haxroomie-cli-install",
      "summary": "",
      "description": "",
      "body": ""
    },
    "list_tutorial.html": {
      "id": "list_tutorial.html",
      "kind": "list",
      "title": "Tutorials",
      "longname": "list:tutorial",
      "name": "Tutorials",
      "tags": "list:tutorial",
      "summary": "All available tutorials.",
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
      "title": "&lt;async&gt; addRoom( roomController [, roomControllerOptions ] ) → {RoomController}",
      "longname": "Haxroomie#addRoom",
      "name": "addRoom",
      "tags": "Haxroomie#addRoom addRoom",
      "summary": "",
      "description": "Adds a new RoomController. If roomController is a string or number, then it will be used as an id for the new RoomController."
    },
    "RoomController.html": {
      "id": "RoomController.html",
      "kind": "class",
      "title": "RoomController",
      "longname": "RoomController",
      "name": "RoomController",
      "tags": "RoomController",
      "summary": "",
      "description": "RoomController provides an interface to communicate with HaxBall roomObject and Haxball Headless Manager (HHM). Each RoomController controls one tab in the headless browser. You can create new RoomController instances with the Haxroomie#addRoom factory method. The API provides a Promise ready way to call the methods or optionally you can listen to the events each method fires.",
      "body": ""
    },
    "RoomController.html#running": {
      "id": "RoomController.html#running",
      "kind": "member",
      "title": "running :boolean",
      "longname": "RoomController#running",
      "name": "running",
      "tags": "RoomController#running running",
      "summary": "",
      "description": "Is the room running."
    },
    "RoomController.html#hhmLoaded": {
      "id": "RoomController.html#hhmLoaded",
      "kind": "member",
      "title": "hhmLoaded :boolean",
      "longname": "RoomController#hhmLoaded",
      "name": "hhmLoaded",
      "tags": "RoomController#hhmLoaded hhmLoaded",
      "summary": "",
      "description": "Is Haxball Headless Manager loaded."
    },
    "RoomController.html#usable": {
      "id": "RoomController.html#usable",
      "kind": "member",
      "title": "usable :boolean",
      "longname": "RoomController#usable",
      "name": "usable",
      "tags": "RoomController#usable usable",
      "summary": "",
      "description": "Is the instance still usable."
    },
    "RoomController.html#roomInfo": {
      "id": "RoomController.html#roomInfo",
      "kind": "member",
      "title": "roomInfo :object",
      "longname": "RoomController#roomInfo",
      "name": "roomInfo",
      "tags": "RoomController#roomInfo roomInfo",
      "summary": "",
      "description": "If room is running, contains its data (like e.g. roomInfo.roomLink). If not running, then this is null. Returns a copy of the original object."
    },
    "RoomController.html#openRoomLock": {
      "id": "RoomController.html#openRoomLock",
      "kind": "member",
      "title": "openRoomLock :boolean",
      "longname": "RoomController#openRoomLock",
      "name": "openRoomLock",
      "tags": "RoomController#openRoomLock openRoomLock",
      "summary": "",
      "description": "If opening of the room is in process, then this will be true."
    },
    "RoomController.html#plugins": {
      "id": "RoomController.html#plugins",
      "kind": "member",
      "title": "plugins :PluginController",
      "longname": "RoomController#plugins",
      "name": "plugins",
      "tags": "RoomController#plugins plugins",
      "summary": "",
      "description": "Object that can be used to control and get information about plugins. Requires the room to be running!"
    },
    "RoomController.html#repositories": {
      "id": "RoomController.html#repositories",
      "kind": "member",
      "title": "repositories :RepositoryController",
      "longname": "RoomController#repositories",
      "name": "repositories",
      "tags": "RoomController#repositories repositories",
      "summary": "",
      "description": "Object that can be used to control and get information about repositories. Requires the HHM library to be loaded! To load HHM you can use the init() method or open the room with openRoom()."
    },
    "RoomController.html#roles": {
      "id": "RoomController.html#roles",
      "kind": "member",
      "title": "roles :RoleController",
      "longname": "RoomController#roles",
      "name": "roles",
      "tags": "RoomController#roles roles",
      "summary": "",
      "description": "Object that can be used to control and get information about roles. Requires the room to be running and sav/roles plugin to be loaded and enabled!"
    },
    "RoomController.html#init": {
      "id": "RoomController.html#init",
      "kind": "function",
      "title": "&lt;async&gt; init( [ options ] )",
      "longname": "RoomController#init",
      "name": "init",
      "tags": "RoomController#init init",
      "summary": "",
      "description": "Initializes the RoomController by navigating the page to the headless HaxBall URL and loads the Haxball Headless Manager library. This enables the use of the repositories object to get information about repositories before opening the room. Note that calling close will undo this."
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
    "RoomController.html#callRoom": {
      "id": "RoomController.html#callRoom",
      "kind": "function",
      "title": "&lt;async&gt; callRoom( fn ) → {Promise.&lt;any&gt;}",
      "longname": "RoomController#callRoom",
      "name": "callRoom",
      "tags": "RoomController#callRoom callRoom",
      "summary": "",
      "description": "Calls a function of the HaxBall roomObject in the browsers context."
    },
    "RoomController.html#eval": {
      "id": "RoomController.html#eval",
      "kind": "function",
      "title": "&lt;async&gt; eval( pageFunction [, ...args ] ) → {Promise.&lt;Serializable&gt;}",
      "longname": "RoomController#eval",
      "name": "eval",
      "tags": "RoomController#eval eval",
      "summary": "",
      "description": "Wrapper for Puppeteers page.evaluate. Evaluates the given code in the browser tab this instace is controlling. You can access the HaxBall roomObject with HHM.manager.room. e.g. room.eval('HHM.manager.room.getPlayerList()');"
    },
    "RoomController.html#closeRoom": {
      "id": "RoomController.html#closeRoom",
      "kind": "function",
      "title": "&lt;async&gt; closeRoom()",
      "longname": "RoomController#closeRoom",
      "name": "closeRoom",
      "tags": "RoomController#closeRoom closeRoom",
      "summary": "",
      "description": "Closes the headless HaxBall room by navigating the page out of the headless HaxBall URL."
    },
    "PluginController.html": {
      "id": "PluginController.html",
      "kind": "class",
      "title": "PluginController",
      "longname": "PluginController",
      "name": "PluginController",
      "tags": "PluginController",
      "summary": "",
      "description": "Class for controlling Haxball Headless Manager (HHM) plugins.",
      "body": ""
    },
    "PluginController.html#getPlugins": {
      "id": "PluginController.html#getPlugins",
      "kind": "function",
      "title": "&lt;async&gt; getPlugins() → {Promise.&lt;Array.&lt;PluginData&gt;&gt;}",
      "longname": "PluginController#getPlugins",
      "name": "getPlugins",
      "tags": "PluginController#getPlugins getPlugins",
      "summary": "",
      "description": "Returns loaded plugins."
    },
    "PluginController.html#getPlugin": {
      "id": "PluginController.html#getPlugin",
      "kind": "function",
      "title": "&lt;async&gt; getPlugin( name ) → {Promise.&lt;?PluginData&gt;}",
      "longname": "PluginController#getPlugin",
      "name": "getPlugin",
      "tags": "PluginController#getPlugin getPlugin",
      "summary": "",
      "description": "Returns PluginData of the given plugin name."
    },
    "PluginController.html#enablePlugin": {
      "id": "PluginController.html#enablePlugin",
      "kind": "function",
      "title": "&lt;async&gt; enablePlugin( name ) → {Promise.&lt;boolean&gt;}",
      "longname": "PluginController#enablePlugin",
      "name": "enablePlugin",
      "tags": "PluginController#enablePlugin enablePlugin",
      "summary": "",
      "description": "Enables a HHM plugin with the given name."
    },
    "PluginController.html#disablePlugin": {
      "id": "PluginController.html#disablePlugin",
      "kind": "function",
      "title": "&lt;async&gt; disablePlugin( name [, recursive ] ) → {Promise.&lt;Array.&lt;number&gt;&gt;}",
      "longname": "PluginController#disablePlugin",
      "name": "disablePlugin",
      "tags": "PluginController#disablePlugin disablePlugin",
      "summary": "",
      "description": "Disables a HHM plugin with the given name. If the name is an Array then it disables all the plugins in the given order."
    },
    "PluginController.html#getPluginsThatDependOn": {
      "id": "PluginController.html#getPluginsThatDependOn",
      "kind": "function",
      "title": "&lt;async&gt; getPluginsThatDependOn( name [, recursive [, includeDisabled ] ] ) → {Promise.&lt;Array.&lt;PluginData&gt;&gt;}",
      "longname": "PluginController#getPluginsThatDependOn",
      "name": "getPluginsThatDependOn",
      "tags": "PluginController#getPluginsThatDependOn getPluginsThatDependOn",
      "summary": "",
      "description": "Gets a list of plugins that depend on the given plugin."
    },
    "PluginController.html#hasPlugin": {
      "id": "PluginController.html#hasPlugin",
      "kind": "function",
      "title": "&lt;async&gt; hasPlugin( name ) → {Promise.&lt;boolean&gt;}",
      "longname": "PluginController#hasPlugin",
      "name": "hasPlugin",
      "tags": "PluginController#hasPlugin hasPlugin",
      "summary": "",
      "description": "Checks if the room has a plugin with given name loaded."
    },
    "PluginController.html#addPlugin": {
      "id": "PluginController.html#addPlugin",
      "kind": "function",
      "title": "&lt;async&gt; addPlugin( plugin [, pluginConfig ] ) → {Promise.&lt;number&gt;}",
      "longname": "PluginController#addPlugin",
      "name": "addPlugin",
      "tags": "PluginController#addPlugin addPlugin",
      "summary": "",
      "description": "Adds a new plugin. If the plugin is string, then it will be loaded from the available repositories. If the plugin is Plugin, then it will be loaded from contents of Plugin."
    },
    "PluginController.html#removePlugin": {
      "id": "PluginController.html#removePlugin",
      "kind": "function",
      "title": "&lt;async&gt; removePlugin( pluginName [, safe ] ) → {Promise.&lt;boolean&gt;}",
      "longname": "PluginController#removePlugin",
      "name": "removePlugin",
      "tags": "PluginController#removePlugin removePlugin",
      "summary": "",
      "description": "Removes a plugin."
    },
    "PluginController.html#setPluginConfig": {
      "id": "PluginController.html#setPluginConfig",
      "kind": "function",
      "title": "&lt;async&gt; setPluginConfig( pluginConfig [, pluginName ] )",
      "longname": "PluginController#setPluginConfig",
      "name": "setPluginConfig",
      "tags": "PluginController#setPluginConfig setPluginConfig",
      "summary": "",
      "description": "Sets the rooms plugin config. Tries to load plugins that are not loaded from the available repositories and removes the loaded plugins that are not in the given config. If pluginName is given then only config for the given plugin is set."
    },
    "PluginController.html#getPluginConfig": {
      "id": "PluginController.html#getPluginConfig",
      "kind": "function",
      "title": "&lt;async&gt; getPluginConfig( [ pluginName ] ) → {Promise.&lt;object&gt;}",
      "longname": "PluginController#getPluginConfig",
      "name": "getPluginConfig",
      "tags": "PluginController#getPluginConfig getPluginConfig",
      "summary": "",
      "description": "Returns the plugin config for all loaded plugins in the room or if pluginName is given, then return the config for that plugin."
    },
    "RepositoryController.html": {
      "id": "RepositoryController.html",
      "kind": "class",
      "title": "RepositoryController",
      "longname": "RepositoryController",
      "name": "RepositoryController",
      "tags": "RepositoryController",
      "summary": "",
      "description": "Class for controlling Haxball Headless Manager (HHM) repositories.",
      "body": ""
    },
    "RepositoryController.html#addRepository": {
      "id": "RepositoryController.html#addRepository",
      "kind": "function",
      "title": "&lt;async&gt; addRepository( repository [, append ] ) → {Promise.&lt;boolean&gt;}",
      "longname": "RepositoryController#addRepository",
      "name": "addRepository",
      "tags": "RepositoryController#addRepository addRepository",
      "summary": "",
      "description": "Adds a repository. If append is set to true, the new repository will be added with the lowest priority, i.e. plugins will only be loaded from it they can't be found in any other repository. Otherwise the repository will be added with the highest priority."
    },
    "RepositoryController.html#hasRepository": {
      "id": "RepositoryController.html#hasRepository",
      "kind": "function",
      "title": "&lt;async&gt; hasRepository( repository ) → {boolean}",
      "longname": "RepositoryController#hasRepository",
      "name": "hasRepository",
      "tags": "RepositoryController#hasRepository hasRepository",
      "summary": "",
      "description": "Returns whether the given repository already exists. Repositories are considered equal if their configuration is the same."
    },
    "RepositoryController.html#getRepositories": {
      "id": "RepositoryController.html#getRepositories",
      "kind": "function",
      "title": "&lt;async&gt; getRepositories() → {Array.&lt;Repository&gt;}",
      "longname": "RepositoryController#getRepositories",
      "name": "getRepositories",
      "tags": "RepositoryController#getRepositories getRepositories",
      "summary": "",
      "description": "Returns available repositories."
    },
    "RepositoryController.html#getRepositoryInformation": {
      "id": "RepositoryController.html#getRepositoryInformation",
      "kind": "function",
      "title": "&lt;async&gt; getRepositoryInformation( repository ) → {RepositoryData}",
      "longname": "RepositoryController#getRepositoryInformation",
      "name": "getRepositoryInformation",
      "tags": "RepositoryController#getRepositoryInformation getRepositoryInformation",
      "summary": "",
      "description": "Retrieves information about the given repository. The information is loaded from repositorys repository.json config file."
    },
    "module-haxroomie.html": {
      "id": "module-haxroomie.html",
      "kind": "module",
      "title": "haxroomie",
      "longname": "module:haxroomie",
      "name": "haxroomie",
      "tags": "module:haxroomie",
      "summary": "",
      "description": "",
      "body": ""
    }
  }
};