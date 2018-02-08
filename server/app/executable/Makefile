NAME = blackout

SRC_PATH = src

BIN_PATH = bin

SRC_NAME =	main.c\
		process.c\
		png_read.c\
		png_write.c\

INCPNG = -I /usr/local/Cellar/libpng/1.6.34/include/libpng16
LIBPNG = -L /usr/local/Cellar/libpng/1.6.34/lib -lpng16

OBJ_PATH = obj

SUB_PATH =

INCLUDE_PATH = -I include

CC = gcc

CFLAGS = -Werror -Wextra -Wall -g

OBJ_NAME = $(SRC_NAME:.c=.o)

SRC = $(addprefix $(SRC_PATH)/,$(SRC_NAME))
OBJ = $(addprefix $(OBJ_PATH)/,$(OBJ_NAME))

.PHONY: all fclean clean re

all: $(NAME)

$(NAME): $(OBJ_PATH) $(OBJ)
	$(CC) $(CFLAGS) $(INCPNG) $(LIBPNG) $(OBJ) -o $(BIN_PATH)/$(NAME)

$(OBJ_PATH):
	@mkdir -p $(OBJ_PATH)$(SUB_PATH) 2> /dev/null || true

$(OBJ_PATH)/%.o: $(SRC_PATH)/%.c
	$(CC) $(CFLAGS) $(INCLUDE_PATH) -MMD -MP -g -c $^ -o $@

clean:
	$(RM) -r $(OBJ)
	$(RM) -r $(OBJ_PATH)

fclean: clean
	$(RM) -r $(BIN_PATH)/*
	$(RM) -r $(NAME)

re: fclean all

-include (OBJ:.o=.d)
