class Animation:
    def __init__(self):
        print "Animation of particles, commencing in 3, 2, 1..."

    def animate(self, speed, init):
        size = len(init)
        spaces = []
        frames = []
        frame_counter = 0

        # populate spaces
        for i in range(size):
            if init[i] != ".":
                spaces.append({"container": [init[i]]});
            else:
                spaces.append({"container": []});
        
        
        # construct new frame
        frame = ""
        for i, space in enumerate(spaces):
            if spaces[i]["container"]:
                frame += "X"
            else:
                frame += "."
        frame_counter += 1
        # only add based on speed
        print frame
        
        frame = "START"
        while len(frame.replace(".", "")) > 0:
            # loop through spaces and make changes as necessary

            for i, space in enumerate(spaces):
                
                for j, thing in enumerate(space["container"]): 
                    # remove from this spot no matter what
                    del spaces[i]["container"][j]
                    if thing == "L":
                        if i != 0:
                            spaces[i - 1]["container"].append("L")
                    if thing == "R":
                        if i != size - 1:
                            spaces[i + 1]["container"].append("R")
                    else:
                        continue

                    # construct new frame
                    frame = ""
                    for i, space in enumerate(spaces):
                        if spaces[i]["container"]:
                            frame += "X"
                        else:
                            frame += "."
                    # only add based on speed
                    if frame_counter == speed:
                        print frame
                        frames.append(frame)
                        frame_counter = 0 

                    frame_counter += 1
        return frames

a = Animation()

a.animate(2, "..R....")
