import { useMemo, useState } from "react";
import "./App.css";

const practicals = [
  {
    id: 1,
    title: "ANN for Linear Regression",
    category: "Artificial Neural Networks",
    aim: "Implement an Artificial Neural Network for linear regression using forward propagation, backpropagation and gradient descent.",
    topics: ["Training dataset", "Weights and bias", "Forward propagation", "Backpropagation", "Gradient descent", "Mean Squared Error"],
    install: "pip install numpy",
    code: `import numpy as np

# Training Dataset
X = np.array([
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7]
], dtype=float)

Y = np.array([[8], [11], [14], [17], [20]], dtype=float)

# Initialize Weights and Bias
W1 = 0.5
W2 = 0.3
b = 0.2

learning_rate = 0.01
epochs = 10000

print("Initial Weights")
print("W1 =", W1)
print("W2 =", W2)
print("Bias =", b)
print("-" * 50)

# Training Process
for epoch in range(epochs):
    total_error = 0

    for i in range(len(X)):
        x1 = X[i][0]
        x2 = X[i][1]
        target = Y[i][0]

        # Forward Propagation
        net = (x1 * W1) + (x2 * W2) + b
        output = net

        # Calculate Error
        error = target - output
        total_error += error ** 2

        # Backpropagation
        dW1 = -error * x1
        dW2 = -error * x2
        dB = -error

        # Gradient Descent
        W1 = W1 - learning_rate * dW1
        W2 = W2 - learning_rate * dW2
        b = b - learning_rate * dB

    mse = total_error / len(X)

    if epoch % 100 == 0:
        print(f"Epoch {epoch:4d}   MSE = {mse:.6f}")

    if mse < 0.00001:
        print("\\nTraining Completed")
        print("Epoch =", epoch)
        break

# Final Learned Parameters
print("\\nFinal Parameters")
print("W1 =", round(W1, 4))
print("W2 =", round(W2, 4))
print("Bias =", round(b, 4))

# Testing / Prediction
print("\\nPredictions")
print("-" * 50)

for i in range(len(X)):
    x1 = X[i][0]
    x2 = X[i][1]
    predicted = (x1 * W1) + (x2 * W2) + b

    print(
        "Input =", X[i],
        " Actual =", Y[i][0],
        " Predicted =", round(predicted, 3),
        " Error =", round(Y[i][0] - predicted, 5)
    )`
  },
  {
    id: 2,
    title: "Visualize Activation Functions",
    category: "Artificial Neural Networks",
    aim: "Visualize activation functions and compare their curves using Matplotlib.",
    topics: ["Linear", "Binary Step", "Sigmoid", "Tanh", "ReLU", "Leaky ReLU", "PReLU", "RReLU", "ELU", "SELU", "Softplus", "Softsign", "Swish", "Mish", "GELU", "Hard Sigmoid", "Hard Swish", "Hard Tanh", "Gaussian", "ISRU"],
    install: "pip install numpy matplotlib",
    note: "This is the activation-functions visualization part of Practical 2. The Bayesian-Informed ANN section is intentionally excluded.",
    code: `import numpy as np
import matplotlib.pyplot as plt

# Input values
x = np.linspace(-5, 5, 500)

def linear(x):
    return x

def binary_step(x):
    return np.where(x >= 0, 1, 0)

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def tanh(x):
    return np.tanh(x)

def relu(x):
    return np.maximum(0, x)

def leaky_relu(x, alpha=0.1):
    return np.where(x > 0, x, alpha * x)

def prelu(x, alpha=0.25):
    return np.where(x > 0, x, alpha * x)

def rrelu(x):
    alpha = 0.2
    return np.where(x > 0, x, alpha * x)

def elu(x, alpha=1):
    return np.where(x > 0, x, alpha * (np.exp(x) - 1))

def selu(x):
    alpha = 1.67326
    scale = 1.0507
    return scale * np.where(x > 0, x, alpha * (np.exp(x) - 1))

def softplus(x):
    return np.log1p(np.exp(x))

def softsign(x):
    return x / (1 + np.abs(x))

def swish(x):
    return x * sigmoid(x)

def mish(x):
    return x * np.tanh(np.log1p(np.exp(x)))

def gelu(x):
    return 0.5 * x * (1 + np.tanh(
        np.sqrt(2 / np.pi) * (x + 0.044715 * x**3)
    ))

def hard_sigmoid(x):
    return np.clip(0.2 * x + 0.5, 0, 1)

def hard_swish(x):
    return x * np.clip((x + 3) / 6, 0, 1)

def hard_tanh(x):
    return np.clip(x, -1, 1)

def gaussian(x):
    return np.exp(-(x**2))

def isru(x, alpha=1):
    return x / np.sqrt(1 + alpha * x**2)

functions = {
    "Linear": (linear(x), "f(x)=x"),
    "Binary Step": (binary_step(x), "0 if x<0, 1 if x>=0"),
    "Sigmoid": (sigmoid(x), "1/(1+e^-x)"),
    "Tanh": (tanh(x), "tanh(x)"),
    "ReLU": (relu(x), "max(0,x)"),
    "Leaky ReLU": (leaky_relu(x), "max(0.1x,x)"),
    "PReLU": (prelu(x), "max(alpha*x,x)"),
    "RReLU": (rrelu(x), "Random alpha"),
    "ELU": (elu(x), "x if x>0, alpha(e^x-1)"),
    "SELU": (selu(x), "Scaled ELU"),
    "Softplus": (softplus(x), "ln(1+e^x)"),
    "Softsign": (softsign(x), "x/(1+|x|)"),
    "Swish": (swish(x), "x*sigmoid(x)"),
    "Mish": (mish(x), "x*tanh(softplus)"),
    "GELU": (gelu(x), "Approximate GELU"),
    "Hard Sigmoid": (hard_sigmoid(x), "clip(0.2x+0.5)"),
    "Hard Swish": (hard_swish(x), "x*HardSigmoid"),
    "Hard Tanh": (hard_tanh(x), "clip(-1,1)"),
    "Gaussian": (gaussian(x), "e^(-x^2)"),
    "ISRU": (isru(x), "x/sqrt(1+x^2)")
}

plt.figure(figsize=(16, 12))

for i, (name, (y, formula)) in enumerate(functions.items(), 1):
    plt.subplot(5, 4, i)
    plt.plot(x, y)
    plt.title(name)
    plt.grid(True)

plt.tight_layout()
plt.show()`
  },
  {
    id: 3,
    title: "Unsupervised Neural Networks – SOM",
    category: "Unsupervised Learning",
    aim: "Implement a Self Organizing Map on the Iris dataset and compare SOM with K-Means clustering.",
    topics: ["MiniSom", "Iris dataset", "Min-Max scaling", "U-Matrix", "Winning neurons", "Quantization error", "Topographic error", "K-Means comparison"],
    install: "pip install minisom numpy matplotlib scikit-learn",
    code: `from minisom import MiniSom
import numpy as np
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, davies_bouldin_score

# Load Iris Dataset
iris = datasets.load_iris()
data = iris.data
target = iris.target

# Normalize the data
data = MinMaxScaler().fit_transform(data)

labels_iris = {
    0: "Setosa",
    1: "Versicolor",
    2: "Virginica"
}

# SOM Parameters
SOM_X = 8
SOM_Y = 8
INPUT_LEN = data.shape[1]
ALPHA = 0.5
SIGMA = 1.5
NEIGHBORHOOD = "triangle"
DISTANCE = "euclidean"
TOPOLOGY = "rectangular"
RANDOM_SEED = 123

# Create SOM
som = MiniSom(
    x=SOM_X,
    y=SOM_Y,
    input_len=INPUT_LEN,
    sigma=SIGMA,
    learning_rate=ALPHA,
    neighborhood_function=NEIGHBORHOOD,
    activation_distance=DISTANCE,
    topology=TOPOLOGY,
    random_seed=RANDOM_SEED
)

# Initialize weights using PCA
som.pca_weights_init(data)

# Train SOM
N_ITERATIONS = 5000
print("Training SOM...")
som.train_random(data, N_ITERATIONS, verbose=False)

print("\\nTraining Completed!")
print("Quantization Error:", som.quantization_error(data))
print("Topographic Error:", som.topographic_error(data))

# U-Matrix
plt.figure(figsize=(8, 8))
plt.title("SOM U-Matrix")
plt.pcolor(som.distance_map().T, cmap="gist_yarg")
plt.colorbar(label="Distance")
plt.show()

# U-Matrix with Winning Neurons
plt.figure(figsize=(8, 8))
plt.title("Winning Neurons")
plt.pcolor(som.distance_map().T, cmap="gist_yarg")
plt.colorbar()

markers = ["o", "s", "^"]
colors = ["red", "green", "blue"]

for i, x in enumerate(data):
    winner = som.winner(x)
    plt.plot(
        winner[0] + 0.5,
        winner[1] + 0.5,
        markers[target[i]],
        markerfacecolor="None",
        markeredgecolor=colors[target[i]],
        markersize=12,
        markeredgewidth=2
    )

plt.grid(True)
plt.show()

# Scatter Plot of Winning Neurons
w_x, w_y = zip(*[som.winner(d) for d in data])
w_x = np.array(w_x)
w_y = np.array(w_y)

plt.figure(figsize=(8, 8))
plt.title("Scatter Plot of Winning Neurons")
plt.pcolor(som.distance_map().T, cmap="gist_yarg", alpha=0.25)
plt.colorbar()

for c in np.unique(target):
    idx = target == c
    plt.scatter(
        w_x[idx] + 0.5 + (np.random.rand(np.sum(idx)) - 0.5) * 0.6,
        w_y[idx] + 0.5 + (np.random.rand(np.sum(idx)) - 0.5) * 0.6,
        s=60,
        color=colors[c],
        label=labels_iris[c]
    )

plt.legend()
plt.grid(True)
plt.show()

# K-Means comparison
kmeans = KMeans(n_clusters=3, random_state=123, n_init=10)
kmeans_labels = kmeans.fit_predict(data)

print("\\nK-Means Silhouette Score:", silhouette_score(data, kmeans_labels))
print("K-Means Davies-Bouldin Score:", davies_bouldin_score(data, kmeans_labels))

plt.figure(figsize=(7, 5))
plt.scatter(data[:, 0], data[:, 1], c=kmeans_labels)
plt.title("K-Means Clustering on Iris Dataset")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.show()`,
    note: "The journal includes the SOM-on-Iris implementation and a separate SOM/K-Means comparison task. The code above keeps the core SOM workflow and adds a basic K-Means comparison view."
  },
  {
    id: 4,
    title: "Reinforcement Learning – Q-Learning",
    category: "Reinforcement Learning",
    aim: "Implement Q-Learning on the FrozenLake environment using a Q-table, epsilon-greedy action selection and reward-based updates.",
    topics: ["FrozenLake", "Q-table", "Learning rate", "Discount factor", "Epsilon-greedy", "Exploration and exploitation", "Multiple map levels"],
    install: "pip install gymnasium numpy",
    code: `import gymnasium as gym
import numpy as np
import random

# FrozenLake map (Level 1)
desc = [
    "SFFF",
    "FFFF",
    "FFHF",
    "FFFG"
]

env = gym.make(
    "FrozenLake-v1",
    desc=desc,
    is_slippery=False
)

states = env.observation_space.n
actions = env.action_space.n

Q = np.zeros((states, actions))

learning_rate = 0.8
gamma = 0.95
epsilon = 1.0
epsilon_decay = 0.001
min_epsilon = 0.01

episodes = 2000
max_steps = 100
rewards = []

for ep in range(episodes):
    state, _ = env.reset()
    total_reward = 0

    for step in range(max_steps):
        # Epsilon-greedy action selection
        if random.uniform(0, 1) < epsilon:
            action = env.action_space.sample()
        else:
            action = np.argmax(Q[state])

        next_state, reward, terminated, truncated, _ = env.step(action)
        done = terminated or truncated

        # Q-Learning update
        Q[state, action] += learning_rate * (
            reward + gamma * np.max(Q[next_state]) - Q[state, action]
        )

        state = next_state
        total_reward += reward

        if done:
            break

    epsilon = max(min_epsilon, np.exp(-epsilon_decay * ep))
    rewards.append(total_reward)

print("Training Complete!\\n")
print("Q-Table:")
print(Q)
print("\\nAverage Reward:", np.mean(rewards))

env.close()`
  },
  {
    id: 5,
    title: "Reinforcement Learning with SARSA",
    category: "Reinforcement Learning",
    aim: "Implement the SARSA (State–Action–Reward–State–Action) on-policy temporal-difference algorithm on FrozenLake.",
    topics: ["SARSA", "FrozenLake", "On-policy learning", "Q-table", "Epsilon-greedy", "Temporal-difference update"],
    install: "pip install gymnasium numpy",
    code: `import gymnasium as gym
import numpy as np
import random

env = gym.make("FrozenLake-v1", is_slippery=False)

states = env.observation_space.n
actions = env.action_space.n

Q = np.zeros((states, actions))

alpha = 0.8
gamma = 0.95
epsilon = 1.0
epsilon_decay = 0.995
min_epsilon = 0.01
episodes = 2000

def choose_action(state):
    if random.random() < epsilon:
        return env.action_space.sample()
    return np.argmax(Q[state])

for episode in range(episodes):
    state, _ = env.reset()
    action = choose_action(state)

    for step in range(100):
        next_state, reward, terminated, truncated, _ = env.step(action)
        done = terminated or truncated

        if done:
            target = reward
        else:
            next_action = choose_action(next_state)
            target = reward + gamma * Q[next_state, next_action]

        Q[state, action] += alpha * (target - Q[state, action])

        if done:
            break

        state = next_state
        action = next_action

    epsilon = max(min_epsilon, epsilon * epsilon_decay)

print("Training Complete")
print("SARSA Q-Table:")
print(Q)

env.close()`
  },
  {
    id: 6,
    title: "Reinforcement Learning with Neural Networks – DQN",
    category: "Reinforcement Learning",
    aim: "Implement a Deep Q-Network that uses a neural network to approximate Q-values for the CartPole environment.",
    topics: ["Deep Q-Network", "CartPole", "Experience replay", "Neural network", "Epsilon-greedy", "Q-value approximation"],
    install: "pip install gymnasium numpy tensorflow",
    code: `import gymnasium as gym
import numpy as np
import random
from collections import deque
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam

env = gym.make("CartPole-v1")

state_size = env.observation_space.shape[0]
action_size = env.action_space.n

model = Sequential([
    Dense(24, activation="relu", input_shape=(state_size,)),
    Dense(24, activation="relu"),
    Dense(action_size, activation="linear")
])

model.compile(optimizer=Adam(learning_rate=0.001), loss="mse")

memory = deque(maxlen=2000)
gamma = 0.95
epsilon = 1.0
epsilon_min = 0.01
epsilon_decay = 0.995
batch_size = 32
episodes = 50

for episode in range(episodes):
    state, _ = env.reset()
    state = np.reshape(state, [1, state_size])
    total_reward = 0

    for step in range(500):
        if random.random() <= epsilon:
            action = env.action_space.sample()
        else:
            action = np.argmax(model.predict(state, verbose=0)[0])

        next_state, reward, terminated, truncated, _ = env.step(action)
        done = terminated or truncated
        next_state = np.reshape(next_state, [1, state_size])

        memory.append((state, action, reward, next_state, done))
        state = next_state
        total_reward += reward

        if done:
            break

        if len(memory) >= batch_size:
            batch = random.sample(memory, batch_size)

            for s, a, r, ns, d in batch:
                target = r if d else r + gamma * np.max(model.predict(ns, verbose=0)[0])
                target_f = model.predict(s, verbose=0)
                target_f[0][a] = target
                model.fit(s, target_f, epochs=1, verbose=0)

    epsilon = max(epsilon_min, epsilon * epsilon_decay)
    print("Episode:", episode + 1, "Reward:", total_reward)

env.close()`
  },
  {
    id: 7,
    title: "Radial Basis Function Neural Network",
    category: "Artificial Neural Networks",
    aim: "Implement an RBF Neural Network for solving XOR classification using Gaussian basis functions and determine output weights.",
    topics: ["RBF network", "XOR", "Gaussian basis function", "Centers", "Sigma", "Hidden layer", "Pseudo-inverse weights"],
    install: "pip install numpy",
    code: `import numpy as np

# Input
x = np.array([1, 0])  # Change input here

# Centers
C = np.array([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
])

# Output Weights
# W = np.array([-0.8, 0.9, 0.9, -0.8])
W = np.array([-3.0359, 3.4233, 3.4233, -3.0359])

# Sigma
sigma = 1.0

# Distance Squared
d = np.sum((x - C) ** 2, axis=1)

# Gaussian RBF Hidden Layer
H = np.exp(-d / (2 * sigma ** 2))

# Network Output
Y = np.sum(H * W)

print("Input :", x)
print("Distance^2 :", d)
print("Hidden Layer Outputs :", np.round(H, 3))
print("Network Output :", round(Y, 4))

# XOR Output
if Y > 0:
    print("XOR Output = 1")
else:
    print("XOR Output = 0")

# Determine how weights are calculated
X = np.array([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
])

T = np.array([0, 1, 1, 0])
sigma = 1.0
C = X.copy()

# Hidden matrix
H = []

for x in X:
    d = np.sum((x - C) ** 2, axis=1)
    h = np.exp(-d / (2 * sigma ** 2))
    H.append(h)

H = np.array(H)

# Learn output weights
W = np.linalg.pinv(H) @ T

print("Hidden Matrix:\\n", np.round(H, 3))
print("Weights:", np.round(W, 4))`
  },
  {
    id: 8,
    title: "Genetic Algorithms – I",
    category: "Genetic Algorithms",
    aim: "Design and visualize a Genetic Algorithm that evolves a random population of strings until it matches the target string FYBSC.",
    topics: ["Population", "Chromosome", "Fitness function", "Roulette wheel selection", "Single-point crossover", "Guided mutation", "Elitism", "Generation visualization"],
    install: "pip install matplotlib",
    code: `import random
import string
import matplotlib.pyplot as plt

TARGET = "FYBSC"
GENES = string.ascii_uppercase

POPULATION_SIZE = 20
MUTATION_RATE = 0.10
MAX_GENERATIONS = 500

def create_chromosome():
    return ''.join(random.choice(GENES) for _ in range(len(TARGET)))

def fitness(chromosome):
    score = 0

    for i in range(len(TARGET)):
        if chromosome[i] == TARGET[i]:
            score += 2

    for ch in chromosome:
        if ch in TARGET:
            score += 1

    return score

def roulette_selection(population, fitness_scores):
    total = sum(fitness_scores)

    if total == 0:
        return random.choice(population)

    r = random.uniform(0, total)
    upto = 0

    for chrom, fit in zip(population, fitness_scores):
        upto += fit
        if upto >= r:
            return chrom

    return population[-1]

def crossover(p1, p2):
    point = random.randint(1, len(TARGET) - 1)
    return p1[:point] + p2[point:], p2[:point] + p1[point:]

def mutate(child):
    child = list(child)

    for i in range(len(child)):
        if random.random() < MUTATION_RATE:
            if random.random() < 0.7:
                child[i] = TARGET[i]
            else:
                child[i] = random.choice(GENES)

    return ''.join(child)

# Initial population
population = [create_chromosome() for _ in range(POPULATION_SIZE)]

plt.ion()
for generation in range(MAX_GENERATIONS):
    scores = [fitness(chrom) for chrom in population]
    best = max(population, key=fitness)

    print("\\nGeneration:", generation + 1)
    for chrom, score in zip(population, scores):
        print(chrom, "Fitness:", score)

    if best == TARGET:
        print("Target found:", best)
        break

    # Elitism
    new_population = [best]

    while len(new_population) < POPULATION_SIZE:
        p1 = roulette_selection(population, scores)
        p2 = roulette_selection(population, scores)

        child1, child2 = crossover(p1, p2)
        new_population.append(mutate(child1))

        if len(new_population) < POPULATION_SIZE:
            new_population.append(mutate(child2))

    population = new_population

    # Fitness pie chart
    plt.clf()
    plt.pie([max(1, s) for s in scores])
    plt.title("Generation " + str(generation + 1))
    plt.pause(0.1)

plt.ioff()
plt.show()`,
    note: "The journal describes an animated pie chart and the roulette-wheel GA. This is a compact runnable version of that workflow."
  },
  {
    id: 9,
    title: "Genetic Algorithms – II",
    category: "Genetic Algorithms",
    aim: "Implement Tournament Selection and Rank Selection for the target string INDIA.",
    topics: ["Target INDIA", "Tournament selection", "Rank selection", "Fitness calculation", "Single-point crossover", "Mutation", "Elitism"],
    install: "pip install matplotlib",
    code: `import random
import string
import matplotlib.pyplot as plt

# Configuration
TARGET_STRING = "INDIA"
GENE_POOL = string.ascii_uppercase
POPULATION_SIZE = 20
MUTATION_RATE = 0.10
TOURNAMENT_SIZE = 3

def create_initial_population():
    population = []

    for _ in range(POPULATION_SIZE):
        chromosome = ""
        for _ in range(len(TARGET_STRING)):
            chromosome += random.choice(GENE_POOL)
        population.append(chromosome)

    return population

def calculate_fitness(individual):
    score = 0

    for i in range(len(TARGET_STRING)):
        if individual[i] == TARGET_STRING[i]:
            score += 1

    return score

def tournament_selection(population):
    candidates = random.sample(population, TOURNAMENT_SIZE)
    return max(candidates, key=calculate_fitness)

def rank_selection(population):
    sorted_pop = sorted(population, key=calculate_fitness)
    rank_weights = list(range(1, len(sorted_pop) + 1))
    parents = random.choices(sorted_pop, weights=rank_weights, k=2)
    return parents[0], parents[1]

def single_point_crossover(p1, p2):
    point = random.randint(1, len(TARGET_STRING) - 1)
    return p1[:point] + p2[point:]

def mutate_child(individual):
    mutated = ""

    for char in individual:
        if random.random() < MUTATION_RATE:
            mutated += random.choice(GENE_POOL)
        else:
            mutated += char

    return mutated

def run_genetic_algorithm(selection_type):
    population = create_initial_population()
    gen_count = 1
    gen_history = []
    fit_history = []

    print("\\n--- RUNNING", selection_type, "SELECTION ---")

    while True:
        population = sorted(
            population,
            key=calculate_fitness,
            reverse=True
        )

        best_individual = population[0]
        best_fitness = calculate_fitness(best_individual)

        gen_history.append(gen_count)
        fit_history.append(best_fitness)

        print(
            f"Gen {gen_count:2d} | Best: '{best_individual}' | "
            f"Fitness: {best_fitness}/{len(TARGET_STRING)}"
        )

        if best_fitness == len(TARGET_STRING):
            print(f"[{selection_type}] Target reached in Gen {gen_count}")
            break

        # Elitism
        new_population = [best_individual]

        while len(new_population) < POPULATION_SIZE:
            if selection_type == "TOURNAMENT":
                p1 = tournament_selection(population)
                p2 = tournament_selection(population)
            else:
                p1, p2 = rank_selection(population)

            child = single_point_crossover(p1, p2)
            new_population.append(mutate_child(child))

        population = new_population
        gen_count += 1

    plt.plot(gen_history, fit_history, marker="o", label=selection_type)
    return gen_count

# Run both selection methods
tournament_generations = run_genetic_algorithm("TOURNAMENT")
rank_generations = run_genetic_algorithm("RANK")

plt.xlabel("Generation")
plt.ylabel("Best Fitness")
plt.title("Tournament vs Rank Selection")
plt.legend()
plt.grid(True)
plt.show()`,
    note: "The journal's GA-II code uses a loop until the target is reached and compares Tournament and Rank selection. No maximum-generation limit is shown in that source."
  },
  {
    id: 11,
    title: "Particle Swarm Optimization",
    category: "Swarm Intelligence",
    aim: "Implement Particle Swarm Optimization using particles, velocity, personal best and global best to find a target position.",
    topics: ["Particle", "Position", "Velocity", "Personal best (pbest)", "Global best (gbest)", "Inertia weight", "Cognitive and social constants"],
    install: "No external package required (Python standard library)",
    code: `import random

class Particle:
    def __init__(self, position):
        self.position = position
        self.velocity = 0
        self.pbest_pos = position
        self.pbest_fit = float("inf")

    def update_fitness(self, fitness_func):
        current_fit = fitness_func(self.position)

        if current_fit < self.pbest_fit:
            self.pbest_fit = current_fit
            self.pbest_pos = self.position

        return self.pbest_fit


class PSO:
    def __init__(self, food_pos, start_positions, w=0.5, c1=1.5, c2=1.5):
        self.food_pos = food_pos
        self.w = w
        self.c1 = c1
        self.c2 = c2
        self.particles = [Particle(p) for p in start_positions]
        self.gbest_pos = random.choice(start_positions)
        self.gbest_fit = float("inf")
        self.bounds = (1, 20)

    def fitness(self, x):
        return abs(x - self.food_pos)

    def run(self, max_iterations=100, tolerance=0.01):
        for iteration in range(max_iterations):

            # Update Fitness and Global Best
            for p in self.particles:
                fit = p.update_fitness(self.fitness)

                if fit < self.gbest_fit:
                    self.gbest_fit = fit
                    self.gbest_pos = p.pbest_pos

            # Termination Condition
            if self.gbest_fit <= tolerance:
                return iteration + 1, True

            # Update Velocity and Position
            for p in self.particles:
                r1, r2 = random.random(), random.random()

                cognitive = self.c1 * r1 * (p.pbest_pos - p.position)
                social = self.c2 * r2 * (self.gbest_pos - p.position)

                p.velocity = (self.w * p.velocity) + cognitive + social
                p.position += p.velocity

                # Boundary Control
                p.position = max(
                    self.bounds[0],
                    min(self.bounds[1], p.position)
                )

        return max_iterations, False


# Execution
FOOD_LOCATION = random.randint(1, 20)
START_POSITIONS = [1, 4, 10, 15]

optimizer = PSO(
    food_pos=FOOD_LOCATION,
    start_positions=START_POSITIONS
)

iterations, found = optimizer.run()

print("Food Location:", FOOD_LOCATION)
print("Best Position:", optimizer.gbest_pos)
print("Best Fitness:", optimizer.gbest_fit)
print("Iterations:", iterations)
print("Target Found:", found)`
  },
  {
    id: 12,
    title: "Ant Colony Optimization",
    category: "Swarm Intelligence",
    aim: "Implement Ant Colony Optimization to find a short route in a travelling-salesperson-style problem.",
    topics: ["Artificial ants", "Pheromone trails", "Distance matrix", "Heuristic information", "Pheromone evaporation", "Route length"],
    install: "pip install numpy",
    code: `import numpy as np
import random

distance = np.array([
    [0, 2, 5, 7, 6],
    [2, 0, 4, 6, 3],
    [5, 4, 0, 3, 5],
    [7, 6, 3, 0, 4],
    [6, 3, 5, 4, 0]
], dtype=float)

n_cities = len(distance)
n_ants = 10
iterations = 50
alpha = 1.0
beta = 2.0
rho = 0.5
Q = 100.0

pheromone = np.ones((n_cities, n_cities))

def choose_next_city(current, unvisited):
    scores = []

    for city in unvisited:
        tau = pheromone[current][city] ** alpha
        eta = (1.0 / distance[current][city]) ** beta
        scores.append(tau * eta)

    scores = np.array(scores)
    scores /= scores.sum()

    return random.choices(list(unvisited), weights=scores, k=1)[0]

def route_length(route):
    length = sum(
        distance[route[i]][route[i + 1]]
        for i in range(len(route) - 1)
    )
    length += distance[route[-1]][route[0]]
    return length

best_route = None
best_length = float("inf")

for iteration in range(iterations):
    routes = []

    for ant in range(n_ants):
        start = random.randrange(n_cities)
        route = [start]
        unvisited = set(range(n_cities))
        unvisited.remove(start)

        while unvisited:
            city = choose_next_city(route[-1], unvisited)
            route.append(city)
            unvisited.remove(city)

        length = route_length(route)
        routes.append((route, length))

        if length < best_length:
            best_length = length
            best_route = route.copy()

    # Pheromone evaporation
    pheromone *= (1 - rho)

    # Pheromone deposit
    for route, length in routes:
        deposit = Q / length

        for i in range(n_cities - 1):
            a, b = route[i], route[i + 1]
            pheromone[a][b] += deposit
            pheromone[b][a] += deposit

        a, b = route[-1], route[0]
        pheromone[a][b] += deposit
        pheromone[b][a] += deposit

print("Best Route:", best_route)
print("Best Route Length:", best_length)`
  }
];

export default function App() {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);

  const filteredPracticals = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return practicals;
    return practicals.filter((p) =>
      [p.title, p.category, p.aim, ...p.topics].join(" ").toLowerCase().includes(query)
    );
  }, [search]);

  const copyCode = async (id, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);
    } catch {
      setCopied("error-" + id);
    }
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Machine Learning Practical Library</h1>
        <p>MSc Computer Science · Semester I</p>
        <p>Practical aims, important topics, installation commands and Python programs.</p>
      </header>

      <main className="container">
        <h2>Machine Learning Practicals</h2>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search practical, topic or algorithm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear search">×</button>
          )}
        </div>

        {filteredPracticals.length === 0 ? (
          <div className="no-results">
            <h3>No practical found</h3>
            <p>Try another practical name or topic.</p>
          </div>
        ) : filteredPracticals.map((practical) => (
          <section className="practical-card" key={practical.id}>
            <div
              className="practical-header"
              role="button"
              tabIndex={0}
              aria-expanded={expanded === practical.id}
              onClick={() => setExpanded(expanded === practical.id ? null : practical.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded(expanded === practical.id ? null : practical.id);
                }
              }}
            >
              <div>
                <h3>Practical {practical.id} – {practical.title}</h3>
                <small>{practical.category}</small>
              </div>
              <span>{expanded === practical.id ? "−" : "+"}</span>
            </div>

            {expanded === practical.id && (
              <div className="topics">
                <div className="topic-card">
                  <h4>Aim: {practical.aim}</h4>
                  <h4>Topics: {practical.topics.join(" · ")}</h4>
                  {practical.install && <h4>Installation: <code>{practical.install}</code></h4>}
                  {practical.note && <h4>{practical.note}</h4>}
                  <h4>Python Code</h4>
                  <button
                    className="copy-btn"
                    type="button"
                    onClick={() => copyCode(practical.id, practical.code)}
                  >
                    {copied === practical.id ? "Copied!" : copied === "error-" + practical.id ? "Copy failed" : "Copy Code"}
                  </button>
                  <pre><code>{practical.code}</code></pre>
                </div>
              </div>
            )}
          </section>
        ))}
      </main>

      <footer>Machine Learning Practical Library · MSc Computer Science</footer>
    </div>
  );
}