import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './CompactMapModule.styles';

export function CompactMapModule() {
  return (
    <View style={styles.container}>
      {/* Water base background is the container itself */}

      {/* Land edge — rotated decorative element */}
      <View style={styles.landEdgeWrapper}>
        <View style={styles.landEdge} />
      </View>

      {/* Dock structures */}
      <View style={styles.dockNorth} />
      <View style={styles.dockA} />
      <View style={styles.dockB} />
      <View style={styles.dockC} />

      {/* Coordinate strip at bottom */}
      <View style={styles.coordinateStrip} />

      {/* Header: marina name + status */}
      <Text style={styles.marinaName}>PORT AZURE MARINA</Text>
      <Text style={styles.captainsVisible}>7 captains visible</Text>

      {/* Online indicator */}
      <View style={styles.onlineDot} />
      <Text style={styles.onlineLabel}>Online</Text>

      {/* You marker */}
      <View style={styles.youAccuracy} />
      <View style={styles.youOuter} />
      <View style={styles.youDot} />
      <View style={styles.youLabel}>
        <Text style={styles.youLabelText}>You</Text>
      </View>

      {/* Maya marker (selected/pulse) */}
      <View style={styles.mayaPulse} />
      <View style={styles.mayaOuter} />
      <View style={styles.mayaDot}>
        <Text style={styles.mayaInitials}>MC</Text>
      </View>
      <View style={styles.mayaLabel}>
        <Text style={styles.mayaLabelText}>Maya</Text>
      </View>

      {/* AR marker */}
      <View style={styles.arOuter} />
      <View style={styles.arDot}>
        <Text style={styles.markerInitialsSmall}>AR</Text>
      </View>

      {/* JP marker */}
      <View style={styles.jpOuter} />
      <View style={styles.jpDot}>
        <Text style={styles.markerInitialsSmall}>JP</Text>
      </View>

      {/* Coordinate strip text */}
      <Text style={styles.coordinateText}>
        {'37.807° N   122.417° W      refreshed 2 min ago'}
      </Text>
    </View>
  );
}
