import {
  FlatList,
  Platform,
  TouchableHighlight,
  View,
  Text,
} from "react-native";




export function ListElements() {

	function _onPress(item: any) {
		console.log(item);
	}

  return (
    <FlatList
      ItemSeparatorComponent={
        Platform.OS !== "android" &&
        (({ highlighted }) => (
          <View style={[style.separator, highlighted && { marginLeft: 0 }]} />
        ))
      }
      data={[{ title: "Title Text", key: "item1" }]}
      renderItem={({ item, index, separators }) => (
        <TouchableHighlight
          key={item.key}
          onPress={() => _onPress(item)}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
        >
          <View style={{ backgroundColor: "white" }}>
            <Text>{item.title}</Text>
          </View>
        </TouchableHighlight>
      )}
    />
  );
}