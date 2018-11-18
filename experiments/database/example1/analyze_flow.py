network.add('Bus', 'B0')
network.add('Bus', 'B1')
network.add('Bus', 'B2')
# print(network.buses)


network.add('Line', 'L0', bus0='B0', bus1='B1', x=0.0001)
network.add('Line', 'L1', bus0='B1', bus1='B2', x=0.0001)
network.add('Line', 'L2', bus0='B2', bus1='B0', x=0.0001)
# print(network.lines)


network.add('Generator', 'G0', bus='B0', p_set=100)
# print(network.generators)
# print(network.generators_t.p_set)


network.add('Load', 'L0', bus='B1', p_set=100)
# print(network.loads)
# print(network.loads_t.p_set)


network.pf()
print(network.lines_t.p0)
print(network.buses_t.v_ang * 180 / np.pi)
print(network.buses_t.v_mag_pu)
