
class MealsController {

    async verifyUserAccess(id, user, response) {
        try {
            const meal = await prisma.meal.findUnique({
                where: { id: id },
            });

            if (!meal) {
                return response.status(404).json({ message: "Essa refeição não existe." });
            }else if (meal.user !== user) {
                return response.status(403).json({ message: "Você não tem permissão para editar esta refeição." });
            }

            return meal;
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: "Erro no servidor." });
        }
    }
    //Post
    async post(request, response) {
        try {
            const { title, description, time, user } = request.body;
            console.log(title, description, time, user)
            const meal = await prisma.meal.create({
                data: {
                    title,
                    description,
                    time, 
                    user
                }
            })
            response.json(meal)
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }
    
    //Update
    async patch(request, response) {
        try {
            const { id, title, description, time, user } = request.body;
            // Verifica se o user é o mesmo que criou a refeição.
            
            const meal = await this.verifyUserAccess(id, user, response)
            if (!meal){
                return;
            } 
            const updateMeal = await prisma.meal.update({
                where: {
                    id: id,
                },
                data: {
                    title: title,
                    description: description,
                    time: time,
                    user: user
                },
            })
            response.json(updateMeal)
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }

    // Delete
    async delete(request, response) {
        try {
            const { id, user } = request.bpdy;
            const meal = await this.verifyUserAccess(id, user, response)
            if (!meal){
                return;
            } 
            const deleteMeal = await prisma.meal.delete({
                where: {
                    id: id,
                }
            })
            response.json(deleteMeal)
        } catch (error){
            console.log(error)
            return response.status(400).send()
        }
    }

    async listMeals(request, response) {
        try {
            const { user } = request.body;
            const meals = await prisma.meal.findMany({
                where: {
                    user: user,
                },
            });

            response.json(meals);
        } catch (error) {
            console.log(error);
            return response.status(400).send();
        }
    }

    async get(request, response) {
        try {
            const { id, user } = request.npdy;
            const meal = await this.verifyUserAccess(id, user, response)
            if (!meal){
                return;
            } 
            const getMeal = await prisma.meal.findUnique({
                where: {
                    id: id,
                },
            });
            response.json(getMeal);
        } catch (error) {
            console.log(error);
            return response.status(400).send();
        }
    }
}
