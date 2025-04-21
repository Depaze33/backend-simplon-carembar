CREATE TABLE Jokes (
                      id SERIAL PRIMARY KEY,
                      question VARCHAR(255),
                      response VARCHAR(255),
                      dateCreation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                      dateModification TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

)